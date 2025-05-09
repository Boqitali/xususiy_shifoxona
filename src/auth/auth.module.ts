import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PatientService } from './patient/patient.service';
import { PatientController } from './patient/paitent.controller';
import { PatientsModule } from '../patients/patients.module';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [JwtModule.register({global: true}), 
    PatientsModule, DoctorsModule
  ],
  controllers: [PatientController, DoctorController],
  providers: [PatientService, DoctorService],
})
export class AuthModule {}
