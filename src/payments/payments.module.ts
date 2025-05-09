import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './models/payment.model';
import { PatientsModule } from '../patients/patients.module';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment]),
    PatientsModule, AppointmentsModule
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
