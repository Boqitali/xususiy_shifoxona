import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    amount: number;
    payment_method: string;
    payment_date: Date;
    patient_id: number;
    appointment_id: number;
}
