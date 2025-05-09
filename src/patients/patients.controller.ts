import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Patient } from './models/patient.model';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({summary: "Bemorlarni qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Create patient",
    type: Patient
  })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOperation({summary: "Barcha bemorlarni olish"})
  @ApiResponse({
    status: 200,
    description: "List of patients",
    type: [Patient]
  })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiOperation({summary: "Bemorlarni id bilan olish"})
  @ApiResponse({
    status: 200,
    description: "List of patient",
    type: Patient
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiOperation({summary: "Bemorlarni id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description: "Update patient",
    type: Patient
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @ApiOperation({summary: "Bemorlarni id bilan o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Delete patient",
    type: Patient
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }

  @Get("activate/:link")
  activatePatient(@Param("link")link:string) {
    return this.patientsService.activatePatient(link);
  }
}
