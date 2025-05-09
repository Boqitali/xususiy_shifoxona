import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Medication } from './models/medication.model';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @ApiOperation({summary: "Medicationlarni qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Create Medication",
    type: Medication
  })
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @ApiOperation({summary: "Barcha Medicationlarni olish"})
  @ApiResponse({
    status: 200,
    description: "List of Medication",
    type: [Medication]
  })
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @ApiOperation({summary: "Medicationi id bilan olish"})
  @ApiResponse({
    status: 200,
    description: "Medication id bilan ko'rish",
    type: Medication
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id);
  }

  @ApiOperation({summary: "Medication id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description: "Update medication",
    type: Medication
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicationDto: UpdateMedicationDto) {
    return this.medicationsService.update(+id, updateMedicationDto);
  }

  @ApiOperation({summary: "Medication id bilan o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Delete medication",
    type: Medication
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationsService.remove(+id);
  }
}
