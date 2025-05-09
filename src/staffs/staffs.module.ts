import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Staff]),
    RolesModule
],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
