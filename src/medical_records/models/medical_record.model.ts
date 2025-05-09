import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { Prescription } from "../../prescriptions/models/prescription.model";


interface IMedicalRecordCreationAttt{
    diagnosis: string;
    treatment: string;
    record_date: Date;
    appointment_id: number;
}

@Table({tableName: "medical_records"})
export class MedicalRecord extends Model<MedicalRecord, IMedicalRecordCreationAttt>{
    @ApiProperty({ //1
        example: 1,
        description: "MedicalRecordning uniqal ID raqami"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number

    @ApiProperty({
        example: 'Dorilar va fizioterapiya',
        description: 'Davolash usuli',
    })
    @Column({
        type: DataType.STRING(50)
    })
    declare treatment: string;

    @ApiProperty({
        example: 'Yurak yetishmovchiligi',
        description: 'Kasallik tashxisi',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    diagnosis: string;

    @ApiProperty({
        example: '2025-05-08',
        description: 'Yozuv sanasi (ISO 8601 formatida)',
    })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    record_date: Date;
    
    @ForeignKey(() => Appointment)
    @ApiProperty({
        example: 1,
        description: "Appointmentning id raqami",
    })
    @Column({
        type: DataType.INTEGER,
    })
    declare appointment_id: number;
    
    @BelongsTo(() => Appointment)
    specialization: Appointment;

    @HasMany(() => Prescription)
    prescription: Prescription[]
}
