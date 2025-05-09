import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";

export class CreateMedicalRecordDto {
    @ApiProperty({
        example: "Yurak yetishmovchiligi",
        description: "Kasallik tashxisi",
    })
    @IsString()
    @IsNotEmpty({ message: "Tashxis bo'sh bo'lishi mumkin emas." })
    @MaxLength(255, { message: "Tashxis 255 belgidan oshmasligi kerak." })
    diagnosis: string;

    @ApiProperty({
        example: "Dorilar va fizioterapiya",
        description: "Davolash usuli",
    })
    @IsString()
    @IsNotEmpty({ message: "Davolash usuli bo'sh bo'lishi mumkin emas." })
    @MaxLength(500, { message: "Davolash usuli 500 belgidan oshmasligi kerak." })
    treatment: string;

    @ApiProperty({
        example: "2025-05-08",
        description: "Yozuv sanasi (ISO 8601 formatida)",
    })
    @IsDateString({}, { message: "Yozuv sanasi noto'g'ri formatda." })
    record_date: Date;

    @ApiProperty({
        example: 1,
        description: "Uchrashuv ID raqami",
    })
    @IsInt({ message: "Uchrashuv ID raqami butun son bo'lishi kerak." })
    @Min(1, { message: "Uchrashuv ID raqami 1 yoki undan katta bo'lishi kerak." })
    appointment_id: number;
}
