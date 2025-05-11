import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from"bcrypt"
import { Response } from 'express';
import { DoctorsService } from '../../doctors/doctors.service';
import { Doctor } from '../../doctors/models/doctor.model';
import { SignInDoctorDto } from './dto/sign-in-doctor.dto';

@Injectable()
export class DoctorService {
    constructor(
        private readonly doctorService: DoctorsService,
        private readonly jwtService: JwtService
    ){}

    async generateToken(doctor: Doctor){
        const payload = {
            id: doctor.id,
            is_active: doctor.is_active,
            full_name: doctor.full_name,
            role: "doctor"
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

    async signInDoctor(signInDoctorDto: SignInDoctorDto, res: Response){
        const doctor = await this.doctorService.findDoctorByEmail(signInDoctorDto.email);
        console.log(doctor)
        if(!doctor){
            throw new BadRequestException("Email yoki Password noto'g'ri!")
        }
        
        // if(!doctor.is_active){
        //     throw new BadRequestException("Avval emailli tasdiqlang!")
        // }
        console.log("+++", doctor.hashed_password)
        const isValidPassword = await bcrypt.compare(
            signInDoctorDto.password,
            doctor.hashed_password
        )
        if(!isValidPassword){
            throw new BadRequestException("Email yoki Password noto'g'ri!")
        }
        const {accessToken, refreshToken} = await this.generateToken(doctor);
        res.cookie("refresh_token", refreshToken,{
            httpOnly: true,
            maxAge: Number(process.env.COOKIE_TIME)
        })
        doctor.hashed_refresh_token = await bcrypt.hash(refreshToken, 7)
        await doctor.save()   
        return {
            message: "Tizimga xush kelibsiz!",
            accessToken,
        }
    }

    async signOutDoctor(refreshToken: string, res: Response) {
        const doctorData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY
        });
        if(!doctorData){
            throw new ForbiddenException("Doctor not verified")
        }
        const hashed_refresh_token = null
        await this.doctorService.updateRefreshToken(
            doctorData.id,
            hashed_refresh_token!
        );
        res.clearCookie("refresh_token")
        const response = {
            message: "Doctor logged succesfully"
        }
        return response
    }

    async refreshTokenDoctor(doctorId: number, refresh_token: string, res: Response){
        const decodedToken = await this.jwtService.decode(refresh_token)
        console.log(doctorId)
        console.log(decodedToken)

        if(doctorId !== decodedToken["id"]){
            throw new ForbiddenException("Ruxsat etilmagan!")
        }
        const doctor = await this.doctorService.findOne(doctorId)

        if(!doctor || !doctor.hashed_refresh_token){
            throw new NotFoundException("Doctor not found")
        }

        const tokenMatch = await bcrypt.compare(
            refresh_token,
            doctor.hashed_refresh_token
        )

        if(!tokenMatch){
            throw new ForbiddenException("Forbidden")
        }

        const {accessToken, refreshToken} = await this.generateToken(doctor)
        const hashed_refresh_token = await bcrypt.hash(refreshToken, 7)

        res.cookie("refresh_token", refreshToken, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true
        })

        const response = {
            message: "Doctor refreshed",
            doctorId: doctor.id,
            access_token: accessToken
        }
        return response
    }
}
