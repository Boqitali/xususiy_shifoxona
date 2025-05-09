import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Department } from './models/department.model';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiOperation({summary: "Departmentlarni qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Create department",
    type: Department
  })
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @ApiOperation({summary: "Barcha departmentlarni olish"})
  @ApiResponse({
    status: 200,
    description: "List of Department",
    type: [Department]
  })
  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @ApiOperation({summary: "Departmentni id bilan olish"})
  @ApiResponse({
    status: 200,
    description: "Departmentni id orqali ko'rish",
    type: Department
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @ApiOperation({summary: "Department id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description: "Update department",
    type: Department
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @ApiOperation({summary: "Departmentlarni id bilan o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Delete department",
    type: Department
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
}
