
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Prescription } from './models/prescription.model';
import { MedicalRecordsService } from '../medical_records/medical_records.service';
import { MedicationsService } from '../medications/medications.service';

@Injectable()
export class PrescriptionsService {
  constructor(
      @InjectModel(Prescription) private readonly prescriptionModel: typeof Prescription,
      private readonly medicalRecordService: MedicalRecordsService,
      private readonly medicationService: MedicationsService,
    ){}

  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const { medical_record_id, medication_id } = createPrescriptionDto;
    const medical_record = await this.medicalRecordService.findOne(medical_record_id);
    if (!medical_record) {
      throw new BadRequestException('Bunday medical_record mavjud emas!');
    }

    const medication = await this.medicationService.findOne(medication_id);
    if (!medication) {
      throw new BadRequestException('Bunday medication mavjud emas!');
    }
    return this.prescriptionModel.create(createPrescriptionDto);
  }

  findAll() {
    return this.prescriptionModel.findAll({include: {all: true}})
  }

  findOne(id: number) {
    return this.prescriptionModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionModel.update(updatePrescriptionDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deletePrescription = await this.prescriptionModel.destroy({where: {id}})
    if(deletePrescription > 0){
      return "Prescription o'chirildi"
    }
    return "Bunday prescription mavjud emas!";
  }
}
