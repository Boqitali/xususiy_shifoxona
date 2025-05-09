import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateLabTestDto {
  @ApiProperty({
    example: "Blood Test",
    description: "Test turi",
  })
  @IsString({ message: "Test turi matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Test turi kiritilishi majburiy" })
  test_type: string;

  @ApiProperty({
    example: "Positive",
    description: "Natija",
  })
  @IsString({ message: "Natija matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Natija kiritilishi majburiy" })
  result: string;

  @ApiProperty({
    example: "2025-05-08T14:30:00.000Z",
    description: "Test o'tkazilgan sana",
  })
  @IsDate({ message: "Test sanasi noto'g'ri formatda" })
  @Type(() => Date)
  test_date: Date;

  @ApiProperty({
    example: 123,
    description: "Bemor ID raqami",
  })
  @IsNumber({}, { message: "Bemor ID raqami son bo'lishi kerak" })
  @IsNotEmpty({ message: "Bemor ID raqami kiritilishi majburiy" })
  patient_id: number;

  @ApiProperty({
    example: 456,
    description: "Doktor ID raqami",
})
  @IsNumber({}, { message: "Doktor ID raqami son bo'lishi kerak" })
  @IsNotEmpty({ message: "Doktor ID raqami kiritilishi majburiy" })
  doctor_id: number;
}
