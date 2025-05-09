import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabTestsService } from './lab_tests.service';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { UpdateLabTestDto } from './dto/update-lab_test.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LabTest } from './models/lab_test.model';

@Controller('lab-tests')
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @ApiOperation({summary: "LabTest qo'shish"})
  @ApiResponse({
    status: 201,
    description:"Create labtest",
    type: LabTest
  })
  @Post()
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @ApiOperation({summary: "Barcha labTestlarni olish"})
  @ApiResponse({
    status: 200,
    description:"List of labtest",
    type: [LabTest]
  })
  @Get()
  findAll() {
    return this.labTestsService.findAll();
  }

  @ApiOperation({summary: "LabTestlarni id bilan olish"})
  @ApiResponse({
    status: 200,
    description:"Id orqali ko'rish",
    type: LabTest
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labTestsService.findOne(+id);
  }

  @ApiOperation({summary: "LabTestlarni yagilash"})
  @ApiResponse({
    status: 200,
    description:"Update labTest",
    type: LabTest
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(+id, updateLabTestDto);
  }

  @ApiOperation({summary: "LabTestlarni o'chirish"})
  @ApiResponse({
    status: 200,
    description:"Delete labTest",
    type: LabTest
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labTestsService.remove(+id);
  }
}
