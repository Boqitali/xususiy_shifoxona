import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Appointment } from './models/appointment.model';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/rols.auth-decorator';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
  
  @Roles("superadmin", "direktor", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Appointment qo'shish"})
  @ApiResponse({
    status: 201,
    description:"Create appoitment",
    type: Appointment
  })
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Roles("superadmin", "direktor", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Barcha appointmentning olish"})
  @ApiResponse({
    status: 200,
    description:"List of appointment",
    type: [Appointment]
  })
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Roles("superadmin", "direktor", "admin", "doctor", "patient")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Appointmentning id bilan olish"})
  @ApiResponse({
    status: 200,
    description:"List of appointment",
    type: Appointment
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Roles("superadmin", "direktor", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Appointmentning id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description:"Update appointment",
    type: Appointment
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Roles("superadmin", "direktor", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Appointmentning id bilan ochirish"})
  @ApiResponse({
    status: 200,
    description:"Delete appointment",
    type: Appointment
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
