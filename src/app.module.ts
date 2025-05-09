import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientsModule } from './patients/patients.module';
import { Patient } from './patients/models/patient.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/role.model';
import { SpecializationModule } from './specialization/specialization.module';
import { Specialization } from './specialization/models/specialization.model';
import { DepartmentsModule } from './departments/departments.module';
import { Department } from './departments/models/department.model';
import { MedicationsModule } from './medications/medications.module';
import { Medication } from './medications/models/medication.model';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { RoomsModule } from './rooms/rooms.module';
import { Doctor } from './doctors/models/doctor.model';
import { Room } from './rooms/models/room.model';
import { Appointment } from './appointments/models/appointment.model';
import { MedicalRecordsModule } from './medical_records/medical_records.module';
import { LabTestsModule } from './lab_tests/lab_tests.module';
import { PaymentsModule } from './payments/payments.module';
import { MedicalRecord } from './medical_records/models/medical_record.model';
import { LabTest } from './lab_tests/models/lab_test.model';
import { Payment } from './payments/models/payment.model';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { StaffsModule } from './staffs/staffs.module';
import { Prescription } from './prescriptions/models/prescription.model';
import { Staff } from './staffs/models/staff.model';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    SequelizeModule.forRoot({
      dialect:"postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username:process.env.PG_USER,
      password:process.env.PG_PASSWORD,
      database:process.env.PG_DB,
      models:[
        Patient, 
        Role, 
        Specialization, 
        Department, 
        Medication, 
        Doctor, 
        Room,
        Appointment,
        MedicalRecord,
        LabTest,
        Payment,
        Prescription,
        Staff
      ],
      autoLoadModels:true,
      sync: {alter: true},
      logging: false,
    }),
    PatientsModule,
    RolesModule,
    SpecializationModule,
    DepartmentsModule,
    MedicationsModule,
    DoctorsModule,
    AppointmentsModule,
    RoomsModule,
    MedicalRecordsModule,
    LabTestsModule,
    PaymentsModule,
    PrescriptionsModule,
    StaffsModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
