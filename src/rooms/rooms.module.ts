import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './models/room.model';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Room]),
    DepartmentsModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}
