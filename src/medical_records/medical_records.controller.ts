import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MedicalRecordsService } from './medical_records.service';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical_record.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MedicalRecord } from './models/medical_record.model';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { Roles } from '../common/decorators/rols.auth-decorator';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Roles("superadmin", "admin", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "MedicalRecord qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Create medicalRecord",
    type: MedicalRecord
  })
  @Post()
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Barcha medicalRecord olish"})
  @ApiResponse({
    status: 200,
    description: "List of medicalRecord",
    type: [MedicalRecord]
  })
  @Get()
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "MedicalRecord id bilan olish"})
  @ApiResponse({
    status: 200,
    description: "List of medicalRecord",
    type: MedicalRecord
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @Roles("superadmin", "admin", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "MedicalRecord id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description: "Update medicalRecord",
    type: MedicalRecord
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "MedicalRecord id bilan o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Delete medicalRecord",
    type: MedicalRecord
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalRecordsService.remove(+id);
  }
}
