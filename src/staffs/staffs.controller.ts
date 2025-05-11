import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Staff } from './models/staff.model';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/rols.auth-decorator';

@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Roles("superadmin", "direktir")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Stafflarni qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Create staff",
    type: Staff
  })
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Roles("superadmin", "direktir")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Barcha stafflarni olish"})
  @ApiResponse({
    status: 200,
    description: "List of staff",
    type: [Staff]
  })
  @Get()
  findAll() {
    return this.staffsService.findAll();
  }

  @Roles("superadmin", "direktir")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Staffni id bilan olish"})
  @ApiResponse({
    status: 200,
    description: "Staffni id orqali ko'rish",
    type: Staff
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffsService.findOne(+id);
  }

  @Roles("superadmin", "direktir")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Staffni id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description: "Update staff",
    type: Staff
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @Roles("superadmin", "direktir")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Staffni id bilan o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Delete staff",
    type: Staff
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffsService.remove(+id);
  }
}
