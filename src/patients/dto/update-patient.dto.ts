import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    full_name: string;
    phone:string;
    address: string;
    email:string;
    birth_date: Date;
    gender: string;
    password: string;
    confirm_password: string;
}
