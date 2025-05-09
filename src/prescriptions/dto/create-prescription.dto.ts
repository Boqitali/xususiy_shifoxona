import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePrescriptionDto {
  @ApiProperty({
    description: "Dori miqdori",
    example: '500mg',
  })
  @IsString({ message: "Doza matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Doza kiritilishi majburiy" })
  dosage: string;

  @ApiProperty({
    description: "Qabul qilish chastotasi",
    example: '2 times a day',
  })
  @IsString({ message: "Chastota matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Chastota kiritilishi majburiy" })
  frequency: string;

  @ApiProperty({
    description: "Davolanish muddati",
    example: '7 days',
  })
  @IsString({ message: "Davomiylik matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Davomiylik kiritilishi majburiy" })
  duration: string;

  @ApiProperty({
    description: "Tibbiy yozuv ID raqami",
    example: 101,
  })
  @IsNumber({}, { message: "Tibbiy yozuv ID raqami son bo'lishi kerak" })
  @IsNotEmpty({ message: "Tibbiy yozuv ID raqami kiritilishi majburiy" })
  medical_record_id: number;

  @ApiProperty({
    description: "Dori ID raqami",
    example: 202,
  })
  @IsNumber({}, { message: "Dori ID raqami son bo'lishi kerak" })
  @IsNotEmpty({ message: "Dori ID raqami kiritilishi majburiy" })
  medication_id: number;
}
