import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { PatientsModule } from '../patients/patients.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Appointment]),
    PatientsModule, DoctorsModule, RoomsModule
],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
