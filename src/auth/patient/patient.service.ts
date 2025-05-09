import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PatientsService } from '../../patients/patients.service';
import { JwtService } from '@nestjs/jwt';
import { Patient } from '../../patients/models/patient.model';
import { CreatePatientDto } from '../../patients/dto/create-patient.dto';
import { SignInPatientDto } from './dto/sign-in-patient.dto';

import * as bcrypt from"bcrypt"
import { Response } from 'express';

@Injectable()
export class PatientService {
    constructor(
        private readonly patientsService: PatientsService,
        private readonly jwtService: JwtService
    ){}

    async generateToken(patient: Patient){
        const payload = {
            id: patient.id,
            is_active: patient.is_active,
            full_name: patient.full_name
        }
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME
            }),
        ])
        return {
            accessToken, 
            refreshToken
        }
    }

    async signUpPatient(createPatientDto: CreatePatientDto){
        const candidate = await this.patientsService.findPatientByEmail(createPatientDto.email);

        if(candidate){
            throw new ConflictException("Bunday emailli foydalanuvchi mavjud!")
        }
        const newPatient = await this.patientsService.create(createPatientDto)
        return {message: "Patient qo'shildi", patientId: newPatient.id}
    };

    async signInPatient(signInPatientDto: SignInPatientDto, res: Response){
        const patient = await this.patientsService.findPatientByEmail(signInPatientDto.email);
        if(!patient){
            throw new BadRequestException("Email yoki Password noto'g'ri!")
        }
        
        if(!patient.is_active){
            throw new BadRequestException("Avval emailli tasdiqlang!")
        }

        const isValidPassword = await bcrypt.compare(
            signInPatientDto.password,
            patient.hashed_password
        )
        if(!isValidPassword){
            throw new BadRequestException("Email yoki Password noto'g'ri!")
        }
        const {accessToken, refreshToken} = await this.generateToken(patient);
        res.cookie("refresh_token", refreshToken,{
            httpOnly: true,
            maxAge: Number(process.env.COOKIE_TIME)
        })
        patient.hashed_refresh_token = await bcrypt.hash(refreshToken, 7)
        await patient.save()   
        return {
            message: "Tizimga xush kelibsiz!",
            accessToken,
        }
    }

    async signOutPatient(refreshToken: string, res: Response) {
        const patientData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY
        });
        if(!patientData){
            throw new ForbiddenException("Patient not verified")
        }
        const hashed_refresh_token = null
        await this.patientsService.updateRefreshToken(
            patientData.id,
            hashed_refresh_token!
        );
        res.clearCookie("refresh_token")
        const response = {
            message: "Patient logged succesfully"
        }
        return response
    }

    async refreshTokenPatient(patientId: number, refresh_token: string, res: Response){
        const decodedToken = await this.jwtService.decode(refresh_token)
        console.log(patientId)
        console.log(decodedToken)

        if(patientId !== decodedToken["id"]){
            throw new ForbiddenException("Ruxsat etilmagan!")
        }
        const patient = await this.patientsService.findOne(patientId)

        if(!patient || !patient.hashed_refresh_token){
            throw new NotFoundException("Patient not found")
        }

        const tokenMatch = await bcrypt.compare(
            refresh_token,
            patient.hashed_refresh_token
        )

        if(!tokenMatch){
            throw new ForbiddenException("Forbidden")
        }

        const {accessToken, refreshToken} = await this.generateToken(patient)
        const hashed_refresh_token = await bcrypt.hash(refreshToken, 7)

        res.cookie("refresh_token", refreshToken, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true
        })

        const response = {
            message: "Patient refreshed",
            patientId: patient.id,
            access_token: accessToken
        }
        return response
    }
}
