import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication } from './models/medication.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MedicationsService {
  constructor(@InjectModel(Medication) private readonly medicationModel: typeof Medication){}
  create(createMedicationDto: CreateMedicationDto) {
    return this.medicationModel.create(createMedicationDto);
  }

  findAll() {
    return this.medicationModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.medicationModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateMedicationDto: UpdateMedicationDto) {    
    return this.medicationModel.update(updateMedicationDto, 
      {where: {id}, returning: true});
  }

  async remove(id: number) {
    const deleteMedication = await this.medicationModel.destroy({where: {id}})
    if(deleteMedication > 0){
      return "Medication o'chirildi"
    } 
    return `Bunday medication mavjud emas!`;
  }
}
