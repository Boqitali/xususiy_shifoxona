import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Doctor } from './models/doctor.model';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiOperation({summary: "Doctorlarni qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Create doctor",
    type: Doctor
  })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @ApiOperation({summary: "Barcha doctorlarni olish"})
  @ApiResponse({
    status: 200,
    description: "List of doctor",
    type: [Doctor]
  })
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @ApiOperation({summary: "Doctorni id bilan olish"})
  @ApiResponse({
    status: 200,
    description: "Doctorni id orqali ko'rish",
    type: Doctor
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @ApiOperation({summary: "Doctorni id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description: "Update doctor",
    type: Doctor
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @ApiOperation({summary: "Doctorni id bilan o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Delete doctor",
    type: Doctor
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }

  
}
