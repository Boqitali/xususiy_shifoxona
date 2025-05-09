import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import { SpecializationService } from '../specialization/specialization.service';

import * as bcrypt from "bcrypt"

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor,
    private readonly specializationService: SpecializationService
  ){}
  async create(createDoctorDto: CreateDoctorDto) {
    const {password, confirm_password, specialization_id} = createDoctorDto
    if(password !== confirm_password){
      throw new BadRequestException("Parollar mos emas!")
    }
    const hashed_password = await bcrypt.hash(password, 7)

    const specialization = await this.specializationService.findOne(specialization_id);
    if (!specialization) {
      throw new BadRequestException('Bunday specialization mavjud emas!');
    }

    return this.doctorModel.create({...createDoctorDto, hashed_password})
  }

  findDoctorByEmail(email: string) {
    return this.doctorModel.findOne({where: {email}});
  }

  findAll() {
    return this.doctorModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.doctorModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorModel.update(updateDoctorDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deleteDoctor = await this.doctorModel.destroy({where: {id}})
    if(deleteDoctor > 0){
      return "Doctir o'chirildi"
    }
    return `Bunday doctor mavjud emas!`;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string){
    const updateDoctor = await this.doctorModel.update(
      {hashed_refresh_token},
      {where: {id}
      }
    )
    return updateDoctor
  }
  
}
