import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './models/department.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DepartmentsService {
  constructor(@InjectModel(Department) private readonly departmentModel: typeof Department){}
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentModel.create(createDepartmentDto);
  }

  findAll() {
    return this.departmentModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.departmentModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentModel.update(updateDepartmentDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deleteDepartment = await this.departmentModel.destroy({where: {id}})
    if(deleteDepartment > 0){
      return "Department o'chirildi"
    }
    return `Bunday department mavjud emas!`;
  }
}
