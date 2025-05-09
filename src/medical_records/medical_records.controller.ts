import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalRecordsService } from './medical_records.service';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical_record.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MedicalRecord } from './models/medical_record.model';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

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
