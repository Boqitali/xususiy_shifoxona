import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { UpdateLabTestDto } from './dto/update-lab_test.dto';
import { LabTest } from './models/lab_test.model';
import { InjectModel } from '@nestjs/sequelize';
import { PatientsService } from '../patients/patients.service';
import { DoctorsService } from '../doctors/doctors.service';

@Injectable()
export class LabTestsService {
  constructor(
    @InjectModel(LabTest) private readonly labTestModel: typeof LabTest,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService
    ){}
  async create(createLabTestDto: CreateLabTestDto) {
    const { patient_id, doctor_id } = createLabTestDto;
    
    const patient = await this.patientsService.findOne(patient_id);
    if (!patient) {
      throw new BadRequestException('Bunday patient mavjud emas!');
    }

    const doctor = await this.doctorsService.findOne(doctor_id);
    if (!doctor) {
      throw new BadRequestException('Bunday doctor mavjud emas!');
    }

    return this.labTestModel.create(createLabTestDto);
  }

  findAll() {
    return this.labTestModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.labTestModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateLabTestDto: UpdateLabTestDto) {
    return this.labTestModel.update(updateLabTestDto,
      {where: {id}, returning: true}
    )
  }

  async remove(id: number) {
    const deletaLabTest = await this.labTestModel.destroy({where: {id}})
    if(deletaLabTest > 0){
      return "Lab Test o'chirildi"
    }
    return `Bunday labTest mavjid emas!`;
  }
}
