import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Specialization } from './models/specialization.model';

@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @ApiOperation({summary: "Specializationlarni qo'shish"})
  @ApiResponse({
      status: 201,
      description: "Create Specialization",
      type: Specialization
  })
  @Post()
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationService.create(createSpecializationDto);
  }

  @ApiOperation({summary: "Barcha specializationlarni olish"})
  @ApiResponse({
      status: 200,
      description: "List of specializations",
      type: [Specialization]
  })
  @Get()
  findAll() {
    return this.specializationService.findAll();
  }

  @ApiOperation({summary: "Specializationni id bilan olish"})
  @ApiResponse({
    status: 200,
    description: "List of specialization",
    type: Specialization
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specializationService.findOne(+id);
  }

  @ApiOperation({summary: "Specializationlarni id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description: "Update specialization",
    type: Specialization
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecializationDto: UpdateSpecializationDto) {
    return this.specializationService.update(+id, updateSpecializationDto);
  }

  @ApiOperation({summary: "Specializationlarni id bilan o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Specialization delete",
    type: Specialization
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specializationService.remove(+id);
  }
}
