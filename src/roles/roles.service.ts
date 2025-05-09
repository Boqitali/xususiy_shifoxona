import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleModel: typeof Role){}
  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  findAll() {
    return this.roleModel.findAll({include: {all: true}})
  }

  findOne(id: number) {
    return this.roleModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.update(updateRoleDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deleteRole = await this.roleModel.destroy({where: {id}})
    if(deleteRole > 0){
      return "Role o'chirildi"
    }
    return `Bunday role mavjud emas!`;
  }
}
