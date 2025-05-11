import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Prescription } from './models/prescription.model';
import { Roles } from '../common/decorators/rols.auth-decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Roles("superadmin", "admin", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Prescription qo'shish"})
  @ApiResponse({
    status: 201,
    description:"Create prescription",
    type: Prescription
  })
  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Roles("superadmin", "admin", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Barcha prescriptionlarni olish"})
  @ApiResponse({
    status: 200,
    description:"List of prescription",
    type: [Prescription]
  })
  @Get()
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Roles("superadmin", "admin", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Barcha prescriptionlarni olish"})
  @ApiResponse({
    status: 200,
    description:"List of prescription",
    type: Prescription
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(+id);
  }

  @Roles("superadmin", "admin", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Barcha prescriptionni yangilash"})
  @ApiResponse({
    status: 200,
    description:"Update prescription",
    type: Prescription
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionsService.update(+id, updatePrescriptionDto);
  }

  @Roles("superadmin", "admin", "doctor")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Barcha prescriptionni o'chirish"})
  @ApiResponse({
    status: 200,
    description:"Delete prescription",
    type: Prescription
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
