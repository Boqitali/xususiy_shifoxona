import { PartialType } from '@nestjs/swagger';
import { CreatePrescriptionDto } from './create-prescription.dto';

export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {
    dosage: string;
    frequency: string;
    duration: string;
    medical_record_id: number;
    medication_id: number;
}
