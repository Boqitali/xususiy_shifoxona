import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PatientService } from './patient/patient.service';
import { PatientController } from './patient/paitent.controller';
import { PatientsModule } from '../patients/patients.module';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { DoctorsModule } from '../doctors/doctors.module';
import { StaffService } from './staff/staff.service';
import { StaffController } from './staff/staff.controller';
import { StaffsModule } from '../staffs/staffs.module';

@Module({
  imports: [JwtModule.register({global: true}), 
    PatientsModule, DoctorsModule, StaffsModule
  ],
  controllers: [PatientController, DoctorController, StaffController],
  providers: [PatientService, DoctorService, StaffService],
})
export class AuthModule {}
