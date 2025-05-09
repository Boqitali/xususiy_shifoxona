import { PartialType } from '@nestjs/swagger';
import { CreateLabTestDto } from './create-lab_test.dto';

export class UpdateLabTestDto extends PartialType(CreateLabTestDto) {
    test_type: string;
    result: string;
    test_date: Date;
    patient_id: number;
    doctor_id: number;
}
