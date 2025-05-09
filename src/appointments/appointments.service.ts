import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { PatientsService } from '../patients/patients.service';
import { DoctorsService } from '../doctors/doctors.service';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment) private readonly appointmentModel: typeof Appointment,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService,
    private readonly roomsService: RoomsService,
  ){}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { patient_id, doctor_id, room_id } = createAppointmentDto;

    const patient = await this.patientsService.findOne(patient_id);
    if (!patient) {
      throw new BadRequestException('Bunday patient mavjud emas!');
    }

    const doctor = await this.doctorsService.findOne(doctor_id);
    if (!doctor) {
      throw new BadRequestException('Bunday doctor mavjud emas!');
    }

    const room = await this.roomsService.findOne(room_id);
    if (!room) {
      throw new BadRequestException('Bunday room mavjud emas!');
    }

    return this.appointmentModel.create(createAppointmentDto);
  }

  findAll() {
    return this.appointmentModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.appointmentModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentModel.update(updateAppointmentDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deleteAppointment = await this.appointmentModel.destroy({where: {id}})
    if(deleteAppointment > 0){
      return "Appointment o'chirildi"
    }
    return `Bunday appointment mavjud emas!`;
  }
}
