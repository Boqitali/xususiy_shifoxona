import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    appointment_date: Date;
    appointment_time: Date;
    status: string;
    reason: string;
    patient_id: number;
    doctor_id: number;
    room_id: number
}
