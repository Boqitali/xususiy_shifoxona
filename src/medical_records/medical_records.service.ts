import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical_record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical_record.model';
import { AppointmentsService } from '../appointments/appointments.service';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord) private readonly medicalRecordModel: typeof MedicalRecord,
    private readonly appointmentService: AppointmentsService
  ){}
  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const {appointment_id} = createMedicalRecordDto
    const appointment = await this.appointmentService.findOne(appointment_id)
    if(!appointment){
      throw new BadRequestException("Bunday appointment mavjud emas!")
    }
    return this.medicalRecordModel.create(createMedicalRecordDto);
  }

  findAll() {
    return this.medicalRecordModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.medicalRecordModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordModel.update(updateMedicalRecordDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deleteMedicalRecord = await this.medicalRecordModel.destroy({where: {id}})
    if(deleteMedicalRecord > 0){
      return "Medical Record o'chirildi"
    }
    return `Bunday medicalRecord majud emas`;
  }
}
