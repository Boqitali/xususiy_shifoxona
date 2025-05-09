import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './models/room.model';
import { DepartmentsService } from '../departments/departments.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room) private readonly roomModel: typeof Room,
    private readonly departmentServise: DepartmentsService
  ){}
  async create(createRoomDto: CreateRoomDto) {
    const {department_id } = createRoomDto
    const department = await this.departmentServise.findOne(department_id)
    if(!department){
      throw new BadRequestException("Bunday department mavjud emas!")
    }
    return this.roomModel.create(createRoomDto);
  }

  findAll() {
    return this.roomModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.roomModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomModel.update(updateRoomDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deleteRoom = await this.roomModel.destroy({where: {id}})
    if(deleteRoom > 0){
      return "Room o'chirildi"
    }
    return "Bunday room mavjud emas!";
  }
}
