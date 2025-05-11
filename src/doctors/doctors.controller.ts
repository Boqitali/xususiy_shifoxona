import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Doctor } from './models/doctor.model';
import { DoctorGuard } from '../common/guards/doctor.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { DoctorSelfGuard } from '../common/guards/doctor-self.guard';
import { Roles } from '../common/decorators/rols.auth-decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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

  @UseGuards(DoctorSelfGuard)
  @UseGuards(DoctorGuard)
  @UseGuards(AuthGuard)
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

  @UseGuards(DoctorSelfGuard)
  @UseGuards(DoctorGuard)
  @UseGuards(AuthGuard)
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

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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
