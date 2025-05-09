import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Appointment } from '../../appointments/models/appointment.model';
import { LabTest } from '../../lab_tests/models/lab_test.model';
import { Payment } from '../../payments/models/payment.model';


interface IPatientCreationAttr{
    full_name: string;
    phone:string;
    address: string;
    email:string;
    birth_date: Date;
    gender: string;
    hashed_password: string;
}

@Table({tableName: "patient"})
export class Patient extends Model<Patient, IPatientCreationAttr>{
    @ApiProperty({ //1
        example: 1,
        description: "Bemorning uniqal ID raqami"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number

    @ApiProperty({ //2
        example: "patient",
        description: "Bemorning ism familiyasi",
    })
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare full_name: string;

    @ApiProperty({ //3
        example: "+998916066606",
        description: "Bemorning telefon raqami",
    })
    @Column({
        type: DataType.STRING(15),
        unique: true,
        allowNull: false
    })
    declare phone:string;

    @ApiProperty({ //4
        example: "address",
        description: "Bemorning yashash joyi",
    })
    @Column({
        type: DataType.STRING
    })
    declare address: string;

    @ApiProperty({ //5
        example: "patient@gmail.com",
        description: "Bemorning email pochtasi",
    })
    @Column({
        type: DataType.STRING(50),
        unique: true,
        allowNull: false
    })
    declare email:string;

    @ApiProperty({ //6
        example: "2000.01.01",
        description: "Bemorning tug'ilgan sanasi",
    })
    @Column({
        type: DataType.DATEONLY,
    })
    declare birth_date: Date;

    @ApiProperty({ //7
        example: "male, female",
        description: "Bemorning jinsi",
    })
    @Column({
        type: DataType.STRING(30)
    })
    declare gender: string;

    @ApiProperty({ //8
        example: "patient/parol",
        description: "Bemorning paroli",
    })
    @Column({
        type: DataType.STRING
    })
    declare hashed_password: string;

    @ApiProperty({ //9
        example: null,
        description: "Bemorning hashed_refresh_token",
    })
    @Column({
        type: DataType.STRING,
    })
    declare hashed_refresh_token: string;

    @ApiProperty({ //10
        example: "activation_link",
        description: "Bemorning activation_link",
    })
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4()
    })
    declare activation_link: string;

    @ApiProperty({ //11
        example: false,
        description: "Bemorning faolligi",
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare is_active: boolean;


    @HasMany(() => Appointment)
    appointment: Appointment[]

    @HasMany(() => LabTest)
    labTest: LabTest[]

    @HasMany(() => Payment)
    payment: Payment[]
}
