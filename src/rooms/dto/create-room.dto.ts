import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min, Max } from "class-validator";

export class CreateRoomDto {
  @ApiProperty({
    example: 101,
    description: "Xona raqami, bu son bo'lishi kerak",
  })
  @IsInt({ message: "Xona raqami butun son bo'lishi kerak" })
  @Min(1, { message: "Xona raqami 1 dan katta bo'lishi kerak" })
  room_number: number;

  @ApiProperty({
    example: 50,
    description: "Xona sig'imi, bu son bo'lishi kerak",
  })
  @IsInt({ message: "Sig'im butun son bo'lishi kerak" })
  @Min(1, { message: "Sig'im 1 dan katta bo'lishi kerak" })
  @Max(500, { message: "Sig'im 500 dan katta bo'lishi mumkin emas" })
  capacity: number;

  @ApiProperty({
    example: "available",
    description: "Xona holati (available, occupied, maintenance)",
  })
  @IsString({ message: "Holat matn formatida bo'lishi kerak" })
  @IsNotEmpty({ message: "Holat bo'sh bo'lmasligi kerak" })
  status: string;

  @ApiProperty({
    example: 2,
    description: "Departament ID raqami",
  })
  @IsInt({ message: "Departament ID butun son bo'lishi kerak" })
  @Min(1, { message: "Departament ID 1 dan katta bo'lishi kerak" })
  department_id: number;
}
