import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Department } from './models/department.model';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/rols.auth-decorator';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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
