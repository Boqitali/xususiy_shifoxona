import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength, ValidateIf } from "class-validator";

export class CreatePatientDto {
    @ApiProperty({
        example: "patient",
        description: "Bemorning ism familiyasi",
    })
    @IsString()
    @IsNotEmpty({ message: "To'liq ism bo'sh bo'lmasligi kerak." })
    @Length(2, 50, { message: "To'liq ism 2 dan 50 gacha bo'lishi kerak." })
    full_name: string;

    @ApiProperty({
        example: "+998916066606",
        description: "Bemorning telefon raqami",
    })
    @IsString()
    @IsNotEmpty({ message: "Telefon raqam bo'sh bo'lmasligi kerak." })
    @Matches(/^\+998[0-9]{9}$/, { message: "Telefon raqam +998 bilan boshlanib, 9 ta raqam bo'lishi kerak." })
    phone: string;

    @ApiProperty({
        example: "address: ",
        description: "Bemorning yashash joyi",
    })
    @IsString()
    @IsNotEmpty({ message: "Manzil bo'sh bo'lmasligi kerak." })
    address: string;

    @ApiProperty({
        example: "patient@gmail.com",
        description: "Bemorning email pochtasi",
    })
    @IsEmail({}, { message: "Email noto'g'ri formatda." })
    @IsNotEmpty({ message: "Email bo'sh bo'lmasligi kerak." })
    email: string;

    @ApiProperty({
        example: "2000.01.01",
        description: "Bemorning tug'ilgan sanasi",
    })
    @Type(() => Date)
    @IsDate({ message: "Tug'ilgan sana to'g'ri formatda bo'lishi kerak." })
    birth_date: Date;

    @ApiProperty({
        example: "male, female",
        description: "Bemorning jinsi",
    })
    @IsString()
    @IsIn(['male', 'female'], { message: "Jins 'male' yoki 'female' bo'lishi kerak." })
    gender: string;

    @ApiProperty({
        example: "patient/parol",
        description: "Bemorning paroli",
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
        example: "patient/parol",
        description: "Bemorning paroli",
    })
    @IsString()
    @IsNotEmpty({ message: "Parolni tasdiqlash bo'sh bo'lmasligi kerak." })
    @Matches(/^.*$/, {
        message: "Parollar mos kelmayapti.",
        context: { passwordField: 'password' }
    })
    confirm_password: string;
}
