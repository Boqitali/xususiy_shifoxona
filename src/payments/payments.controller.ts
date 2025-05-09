import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Payment } from './models/payment.model';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

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
