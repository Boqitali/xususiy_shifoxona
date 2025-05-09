import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Prescription } from './models/prescription.model';
import { MedicalRecordsModule } from '../medical_records/medical_records.module';
import { MedicationsModule } from '../medications/medications.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Prescription]),
    MedicalRecordsModule, MedicationsModule
],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
})
export class PrescriptionsModule {}
