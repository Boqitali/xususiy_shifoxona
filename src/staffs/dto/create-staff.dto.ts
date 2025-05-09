import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsPhoneNumber, IsNumber, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({
    description: "Xodimning ismi",
    example: 'ali',
  })
  @IsString({ message: "Ism matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Ism kiritilishi majburiy" })
  first_name: string;

  @ApiProperty({
    description: "Xodimning familiyasi",
    example: 'vali',
  })
  @IsString({ message: "Familiya matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Familiya kiritilishi majburiy" })
  last_name: string;

  @ApiProperty({
    description: "Xodimning elektron pochtasi",
    example: 'alivali@example.com',
  })
  @IsEmail({}, { message: "Noto'g'ri email format" })
  @IsNotEmpty({ message: "Email kiritilishi majburiy" })
  email: string;

  @ApiProperty({
    description: "Xodimning telefon raqami",
    example: '+998901234567',
  })
  @IsPhoneNumber('UZ', { message: "Telefon raqami noto'g'ri formatda" })
  @IsNotEmpty({ message: "Telefon raqami kiritilishi majburiy" })
  phone: string;

  @ApiProperty({
        example: "strongpassword123",
        description: "Staffning paroli",
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
      example: "staff/parol",
      description: "Staffning paroli",
  })
  @IsString()
  @IsNotEmpty({ message: "Parolni tasdiqlash bo'sh bo'lmasligi kerak." })
  @Matches(/^.*$/, {
      message: "Parollar mos kelmayapti.",
      context: { passwordField: 'password' }
  })
  confirm_password: string;

  @ApiProperty({
    description: "Xodimning roli ID raqami",
    example: 1,
  })
  @IsNumber({}, { message: "Role ID son bo'lishi kerak" })
  @IsNotEmpty({ message: "Role ID kiritilishi majburiy" })
  role_id: number;
}
