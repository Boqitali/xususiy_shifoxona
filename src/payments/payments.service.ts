import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { PatientsService } from '../patients/patients.service';
import { AppointmentsService } from '../appointments/appointments.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
    private readonly patientsService: PatientsService,
    private readonly appointmentService: AppointmentsService,
  ){}
  async create(createPaymentDto: CreatePaymentDto) {
    const { patient_id, appointment_id } = createPaymentDto;

    const patient = await this.patientsService.findOne(patient_id);
    if (!patient) {
      throw new BadRequestException('Bunday patient mavjud emas!');
    }

    const appointment = await this.appointmentService.findOne(appointment_id);
    if (!appointment) {
      throw new BadRequestException('Bunday appointment mavjud emas!');
    }
    return this.paymentModel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.paymentModel.findByPk(id, {include: {all: true}});
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentModel.update(updatePaymentDto,
      {where: {id}, returning: true}
    );
  }

  async remove(id: number) {
    const deletePayment = await this.paymentModel.destroy({where: {id}})
    if(deletePayment > 0){
      return "Payment o'chirildi"
    }
    return `Bunday payment mavjud emas!`;
  }
}
