import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateDepartmentDto {
    @ApiProperty({
        example: "name",
        description: "Mutaxassislik bo'limi",
    })
    @IsString()
    @IsNotEmpty({ message: "Nomi bo'sh bo'lmasligi kerak." })
    @Length(2, 20, { message: "Nomi 2 dan 20 gacha bo'lishi kerak." })
    name: string;

    @ApiProperty({
        example: "description",
        description: "Mutaxassislik bo'limning tavsifi",
    })
    @IsString()
    @IsNotEmpty({ message: "Tavsif bo'sh bo'lmasligi kerak." })
    description: string;
}
