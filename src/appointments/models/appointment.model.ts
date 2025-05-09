import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Room } from "../../rooms/models/room.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";
import { Payment } from "../../payments/models/payment.model";


interface IAppointmentCreationAttr{
    appointment_date: Date;
    appointment_time: Date;
    status: string;
    reason: string;
    patient_id: number;
    doctor_id: number;
    room_id: number
}

@Table({tableName: "appointments"})
export class Appointment extends Model<Appointment, IAppointmentCreationAttr>{
    @ApiProperty({
        example: 1,
        description: "Doctorning uniqal ID raqami",
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ 
        example: "sana", 
        description: 'Tayinlangan sana' 
    })
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    declare appointment_date: Date

    @ApiProperty({ 
        example: 'vaqt', 
        description: 'Tayinlangan vaqt' 
    })
    @Column({
        type: DataType.DATEONLY,
        defaultValue: DataType.NOW
    })
    declare appointment_time: Date

    @ApiProperty({ 
        example: "status", 
        description: 'Tayinlangan holat' 
    })
    @Column({
      type: DataType.STRING
    })
    declare status: string;

    @ApiProperty({ 
        example: "reason", 
        description: 'Tayinlangan sababi' 
    })
    @Column({
      type: DataType.STRING
    })
    declare reason: string;

    @ForeignKey(() => Patient)  
    @ApiProperty({ 
        example: 1, 
        description: 'Bemor ID' 
    })
    @Column({
      type: DataType.INTEGER
    })
    declare patient_id: number;
  
    @ForeignKey(() => Doctor)
    @ApiProperty({
        example: 1,
        description: "Doctor id raqami"
    })
    @Column({
        type: DataType.INTEGER
    })
    declare doctor_id: number
    
    @ForeignKey(() => Room)
    @ApiProperty({
        example: 1,
        description: "Room id raqami"
    })
    @Column({
        type: DataType.INTEGER
    })
    declare room_id: number


    @BelongsTo(() => Patient)
    patient: Patient

    @BelongsTo(() => Doctor)
    doctor: Doctor

    @BelongsTo(() => Room)
    room: Room


    @HasMany(() => MedicalRecord)
    medical_record: MedicalRecord[]

    @HasMany(() => Payment)
    payment: Payment[]
}
