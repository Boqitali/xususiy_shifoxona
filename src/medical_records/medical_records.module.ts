import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical_records.service';
import { MedicalRecordsController } from './medical_records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical_record.model';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [
    SequelizeModule.forFeature([MedicalRecord]), 
    AppointmentsModule
  ],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
