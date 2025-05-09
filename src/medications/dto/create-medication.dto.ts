import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";

export class CreateMedicationDto {
    @ApiProperty({
        example: "name",
        description: "Medication nomi",
    })
    @IsString()
    @IsNotEmpty({ message: "Nomi bo'sh bo'lmasligi kerak." })
    @Length(2, 50, { message: "Nomi 2 dan 50 gacha bo'lishi kerak." })
    name: string;

    @ApiProperty({
        example: "description",
        description: "Medication tavsifi",
    })
    @IsString()
    @IsNotEmpty({ message: "Tavsif bo'sh bo'lmasligi kerak." })
    description: string;

    @ApiProperty({
        example: "soni",
        description: "Medication soni",
    })
    @IsInt({ message: "Soni butun son bo'lishi kerak." })
    @Min(0, { message: "Soni kamida 0 bo'lishi kerak." })
    @Max(10000, { message: "Soni 10,000 dan oshmasligi kerak." })
    stock: number;

    @ApiProperty({
        example: "manufacturer",
        description: "Ishlab chiqqan manufacturer/fabrika ",
    })
    @IsString()
    @IsNotEmpty({ message: "Ishlab chiqaruvchi bo'sh bo'lmasligi kerak." })
    manufacturer: string;
}
