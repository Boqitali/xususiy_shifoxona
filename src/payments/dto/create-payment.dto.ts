import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @ApiProperty({
    description: "To'lov summasi",
    example: 150.75,
  })
  @IsNumber({}, { message: "To'lov summasi son bo'lishi kerak" })
  @IsNotEmpty({ message: "To'lov summasi kiritilishi shart" })
  amount: number;

  @ApiProperty({
    description: "To'lov usuli (Naqd, Kredit karta, Bank o'tkazmasi va h.k.)",
    example: 'Credit Card',
  })
  @IsString({ message: "To'lov usuli matn bo'lishi kerak" })
  @IsNotEmpty({ message: "To'lov usuli kiritilishi shart" })
  payment_method: string;

  @ApiProperty({
    description: "To'lov o'tkazilgan sana",
    example: '2025-05-08T14:30:00.000Z',
  })
  @IsDate({ message: "To'lov sanasi noto'g'ri formatda" })
  @IsNotEmpty({ message: "To'lov sanasi kiritilishi shart" })
  @Type(() => Date) // JSON orqali kelgan vaqtni Date formatiga o'giradi
  payment_date: Date;

  @ApiProperty({
    description: "Bemor ID raqami",
    example: 123,
  })
  @IsNumber({}, { message: "Bemor ID raqami son bo'lishi kerak" })
  @IsNotEmpty({ message: "Bemor ID raqami kiritilishi shart" })
  patient_id: number;

  @ApiProperty({
    description: "Uchrashuv ID raqami",
    example: 456,
  })
  @IsNumber({}, { message: "Uchrashuv ID raqami son bo'lishi kerak" })
  @IsNotEmpty({ message: "Uchrashuv ID raqami kiritilishi shart" })
  appointment_id: number;
}
