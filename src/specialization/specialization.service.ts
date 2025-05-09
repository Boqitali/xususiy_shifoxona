import { Injectable } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Specialization } from './models/specialization.model';

@Injectable()
export class SpecializationService {
  constructor(@InjectModel(Specialization) private readonly specializationModel: typeof Specialization){}
  create(createSpecializationDto: CreateSpecializationDto) {
    return this.specializationModel.create(createSpecializationDto)
  }

  findAll() {
    return this.specializationModel.findAll({include: {all: true}})
  }

  findOne(id: number) {
    return this.specializationModel.findByPk(id, {include: {all: true}})
  }

  update(id: number, updateSpecializationDto: UpdateSpecializationDto) {
    return this.specializationModel.update(updateSpecializationDto,
      {where: {id}, returning: true}
    )
  }

  async remove(id: number) {
    const deleteSpecialization = await this.specializationModel.destroy({where: {id}})
      if(deleteSpecialization > 0){
        return "Specialization o'chirildi"
      }
    
    return `Bunday specialization mavjud emas!`;
  }
}
