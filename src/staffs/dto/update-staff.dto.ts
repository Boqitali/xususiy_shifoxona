import { PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    hashed_password: string;
    role_id: number;
}
