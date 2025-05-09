import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsInt,
  Matches,
} from "class-validator";

export class CreateDoctorDto {
    @ApiProperty({
        example: "Vali Valiyev",
        description: "Doctorning ism familiyasi",
    })
    @IsString()
    @IsNotEmpty({ message: "Ism familiya bo'sh bo'lishi mumkin emas" })
    @MaxLength(50, { message: "Ism familiya 50 ta belgidan oshmasligi kerak" })
    full_name: string;

    @ApiProperty({
        example: "profile.jpg",
        description: "Doctorning rasmi",
    })
    @IsString()
    @IsNotEmpty({ message: "Rasm yo'li bo'sh bo'lishi mumkin emas" })
    picture: string;

    @ApiProperty({
        example: "+998916066606",
        description: "Doctorning telefon raqami",
    })
    @IsPhoneNumber('UZ', { message: "Telefon raqam formati noto'g'ri" })
    @IsNotEmpty({ message: "Telefon raqam kiritilishi shart" })
    phone: string;

    @ApiProperty({
        example: "doctor@gmail.com",
        description: "Doctorning email manzili",
    })
    @IsEmail({}, { message: "Email manzil noto'g'ri formatda" })
    @IsNotEmpty({ message: "Email manzil kiritilishi shart" })
    email: string;

    @ApiProperty({
        example: "strongpassword123",
        description: "Doctorning paroli",
    })
    @IsString()
    @IsNotEmpty({ message: "Parol bo'sh bo'lmasligi kerak." })
    @MinLength(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak." })
    @MaxLength(20, { message: "Parol 20 ta belgidan oshmasligi kerak." })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
        message: "Parol katta harf, kichik harf, raqam va maxsus belgi o'z ichiga olishi kerak."
    })
    password: string; 

    @ApiProperty({
        example: "doctor/parol",
        description: "Doctorning paroli",
    })
    @IsString()
    @IsNotEmpty({ message: "Parolni tasdiqlash bo'sh bo'lmasligi kerak." })
    @Matches(/^.*$/, {
        message: "Parollar mos kelmayapti.",
        context: { passwordField: 'password' }
    })
    confirm_password: string;

    @ApiProperty({
        example: 1,
        description: "Specialization jadvalidagi ID raqami",
    })
    @IsInt({ message: "Specialization ID butun son bo'lishi kerak" })
    @IsNotEmpty({ message: "Specialization ID kiritilishi shart" })
    specialization_id: number;
}
