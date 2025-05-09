import { PartialType } from '@nestjs/swagger';
import { CreateMedicationDto } from './create-medication.dto';

export class UpdateMedicationDto extends PartialType(CreateMedicationDto) {
    name: string;
    description: string;
    stock: number;
    manufacturer: string;
}
