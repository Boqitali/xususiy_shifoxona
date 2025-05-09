import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from"bcrypt"
import { Response } from 'express';
import { StaffsService } from '../../staffs/staffs.service';
import { Staff } from '../../staffs/models/staff.model';
import { SignInStaffDto } from './dto/sign-in-staff.dto';

@Injectable()
export class StaffService {
    constructor(
        private readonly staffsService: StaffsService,
        private readonly jwtService: JwtService
    ){}

    async generateToken(staff: Staff){
        const payload = {
            id: staff.id,
            is_active: staff.is_active,
            role_id: staff.role_id
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

    

    async signInStaff(signInStaffDto: SignInStaffDto, res: Response){
        const staff = await this.staffsService.findStaffByEmail(signInStaffDto.email);
        if(!staff){
            throw new BadRequestException("Email yoki Password noto'g'ri!")
        }
        
        // if(!staff.is_active){
        //     throw new BadRequestException("Avval emailli tasdiqlang!")
        // }

        const isValidPassword = await bcrypt.compare(
            signInStaffDto.password,
            staff.hashed_password
        )
        if(!isValidPassword){
            throw new BadRequestException("Email yoki Password noto'g'ri!")
        }
        const {accessToken, refreshToken} = await this.generateToken(staff);
        res.cookie("refresh_token", refreshToken,{
            httpOnly: true,
            maxAge: Number(process.env.COOKIE_TIME)
        })
        staff.hashed_refresh_token = await bcrypt.hash(refreshToken, 7)
        await staff.save()   
        return {
            message: "Tizimga xush kelibsiz!",
            accessToken,
        }
    }

    async signOutStaff(refreshToken: string, res: Response) {
        const staffData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY
        });
        if(!staffData){
            throw new ForbiddenException("Staff not verified")
        }
        const hashed_refresh_token = null
        await this.staffsService.updateRefreshToken(
            staffData.id,
            hashed_refresh_token!
        );
        res.clearCookie("refresh_token")
        const response = {
            message: "Staff logged succesfully"
        }
        return response
    }

    async refreshTokenStaff(staffId: number, refresh_token: string, res: Response){
        const decodedToken = await this.jwtService.decode(refresh_token)
        console.log(staffId)
        console.log(decodedToken)

        if(staffId !== decodedToken["id"]){
            throw new ForbiddenException("Ruxsat etilmagan!")
        }
        const staff = await this.staffsService.findOne(staffId)

        if(!staff || !staff.hashed_refresh_token){
            throw new NotFoundException("Staff not found")
        }

        const tokenMatch = await bcrypt.compare(
            refresh_token,
            staff.hashed_refresh_token
        )

        if(!tokenMatch){
            throw new ForbiddenException("Forbidden")
        }

        const {accessToken, refreshToken} = await this.generateToken(staff)
        const hashed_refresh_token = await bcrypt.hash(refreshToken, 7)

        res.cookie("refresh_token", refreshToken, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true
        })

        const response = {
            message: "Staff refreshed",
            staffId: staff.id,
            access_token: accessToken
        }
        return response
    }
}
