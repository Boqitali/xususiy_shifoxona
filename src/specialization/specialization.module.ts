import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Specialization } from './models/specialization.model';

@Module({
  imports: [SequelizeModule.forFeature([Specialization])],
  controllers: [SpecializationController],
  providers: [SpecializationService],
  exports: [SpecializationService],
})
export class SpecializationModule {}
