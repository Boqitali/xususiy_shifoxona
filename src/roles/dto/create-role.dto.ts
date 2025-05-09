import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({
        example: "patient",
        description: "Role nomi",
    })
    @IsString()
    @IsNotEmpty({ message: "Nomi bo'sh bo'lmasligi kerak." })
    @Length(2, 20, { message: "Nomi 2 dan 20 gacha bo'lishi kerak." })
    name: string;

    @ApiProperty({
        example: "role",
        description: "Role tavsifi",
    })
    @IsString()
    @IsNotEmpty({ message: "Tavsif bo'sh bo'lmasligi kerak." })
    description: string;
}
