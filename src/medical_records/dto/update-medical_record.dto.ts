import { PartialType } from '@nestjs/swagger';
import { CreateMedicalRecordDto } from './create-medical_record.dto';

export class UpdateMedicalRecordDto extends PartialType(CreateMedicalRecordDto) {
    diagnosis: string;
    treatment: string;
    record_date: Date;
    appointment_id: number;
}
