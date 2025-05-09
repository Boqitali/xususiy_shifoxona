import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Patient } from '../../patients/models/patient.model';
import { Appointment } from '../../appointments/models/appointment.model';

interface IPaymentCreationAttr {
  amount: number;
  payment_method: string;
  payment_date: Date;
  patient_id: number;
  appointment_id: number;
}

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "To'lov ID raqami (Auto Increment)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 150.75,
    description: "To'lov summasi",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare amount: number;

  @ApiProperty({
    example: 'Credit Card',
    description: "To'lov usuli (Naqd, Kredit karta, Bank o'tkazmasi va h.k.)",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare payment_method: string;

  @ApiProperty({
    example: '2025-05-08T14:30:00.000Z',
    description: "To'lov o'tkazilgan sana",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare payment_date: Date;

  @ApiProperty({
    example: 123,
    description: "Bemor ID raqami",
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patient_id: number;

  @ApiProperty({
    example: 456,
    description: "Uchrashuv ID raqami",
  })
  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare appointment_id: number;

  @BelongsTo(() => Patient)
  patient: Patient

  @BelongsTo(() => Appointment)
  appointment: Appointment
}
