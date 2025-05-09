import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';

import * as bcrypt from "bcrypt"
import { MailService } from '../mail/mail.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly mailService: MailService
  ){}
  async create(createPatientDto: CreatePatientDto) {
    const {password, confirm_password} = createPatientDto
    if(password !== confirm_password){
      throw new BadRequestException("Parollar mos emas!")
    }
    const hashed_password = await bcrypt.hash(password, 7)
    const newUser = await this.patientModel.create({...createPatientDto, hashed_password});

    try {
      await this.mailService.sendMail(newUser)
    } catch (error) {
      console.log(error)
      throw new ServiceUnavailableException("Emailga xat yuborisda xatolik")
    }

    return newUser
  }

  findPatientByEmail(email: string) {
    return this.patientModel.findOne({where: {email}});
  }

  findAll() {
    return this.patientModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientModel.update(updatePatientDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deletePatient = await this.patientModel.destroy({where: {id}})
    if(deletePatient > 0){
      return "Patient o'chirildi"
    }
    return `Bunday patient mavjud emas!`;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string){
    const updatePatient = await this.patientModel.update(
      {hashed_refresh_token},
      {where: {id}
      }
    )
    return updatePatient
  }

  async activatePatient(link:string){
    if(!link){
      throw new BadRequestException("Activation is not found")
    }
    const updatePatient = await this.patientModel.update(
      {is_active: true},
      {where: {
        activation_link: link,
        is_active: false
      }, 
      returning: true
    }
    )
    if(!updatePatient[1][0]){
      throw new BadRequestException("Patient already activated")
    }
    return {
      message: "Patient activated succesfully!",
      is_active: updatePatient[1][0].is_active
    }
  }
}
