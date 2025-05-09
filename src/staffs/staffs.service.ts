import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import { RolesService } from '../roles/roles.service';

import * as bcrypt from "bcrypt"

@Injectable()
export class StaffsService {
  constructor(
    @InjectModel(Staff) private readonly staffModel: typeof Staff,
    private readonly roleService: RolesService
  ){}
  async create(createStaffDto: CreateStaffDto) {
    const {password, confirm_password, role_id} = createStaffDto
    if(password !== confirm_password){
      throw new BadRequestException("Parollar mos emas!")
    }
    const hashed_password = await bcrypt.hash(password, 7)

    const role = await this.roleService.findOne(role_id);
    if (!role) {
      throw new BadRequestException('Bunday role mavjud emas!');
    }
    return this.staffModel.create({...createStaffDto, hashed_password});
  }

  findStaffByEmail(email: string) {
    return this.staffModel.findOne({where: {email}});
  }

  findAll() {
    return this.staffModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.staffModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.staffModel.update(updateStaffDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deleteStaff = await this.staffModel.destroy({where: {id}})
    if(deleteStaff > 0){
      return "Staff o'chirildi"
    }
    return `Bunday staff mavjud emas!`;
  }


  async updateRefreshToken(id: number, hashed_refresh_token: string){
    const updateStaff = await this.staffModel.update(
      {hashed_refresh_token},
      {where: {id}
      }
    )
    return updateStaff
  }

}
