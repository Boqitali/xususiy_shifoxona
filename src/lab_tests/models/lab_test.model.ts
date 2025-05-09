import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";


interface ILabtestCreationAttr{
    test_type: string
    result: string;
    test_date: Date;
    patient_id: number;
    doctor_id: number;
}

@Table({tableName: "lab-test", timestamps: false})
export class LabTest extends Model<LabTest, ILabtestCreationAttr>{
    @ApiProperty({
        example: 1,
        description: "LabTestning uniqal ID raqami",
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ApiProperty({ 
        example: "test_type", 
        description: 'test_type' 
    })
    @Column({
      type: DataType.STRING
    })
    declare test_type: string

    @ApiProperty({ 
        example: "natija", 
        description: 'Test natijasi' 
    })
    @Column({
      type: DataType.STRING
    })
    declare result: string;

    @ApiProperty({ 
        example: "sana", 
        description: 'Tayinlangan sana' 
    })
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    declare test_date: Date;

    @ForeignKey(() => Patient)  
    @ApiProperty({ 
        example: 1, 
        description: 'Bemor ID raqami' 
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

    @BelongsTo(() => Patient)
    patient: Patient

    @BelongsTo(() => Doctor)
    doctor: Doctor
}
