import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Payment } from './models/payment.model';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/rols.auth-decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles("patient", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Payment qo'shish"})
  @ApiResponse({
    status: 201,
    description:"Create payment",
    type: Payment
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Barcha paymentlarini olish"})
  @ApiResponse({
    status: 200,
    description:"List of payment",
    type: [Payment]
  })
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Paymentlarini id bilan olish"})
  @ApiResponse({
    status: 200,
    description:"List of payment",
    type: [Payment]
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Paymentlarini id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description:"Update payment",
    type: [Payment]
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({summary: "Paymentlarini id bilan o'chirish"})
  @ApiResponse({
    status: 200,
    description:"Delete payment",
    type: [Payment]
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
