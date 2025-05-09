import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
    full_name: string;
    picture: string;
    phone: string;
    email: string;
    password: string;
    confirm_password: string;
    specialization_id: number;
}   
