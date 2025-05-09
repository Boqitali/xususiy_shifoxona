import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Prescription } from "../../prescriptions/models/prescription.model";


interface IMedicationCreationAttr{
    name: string;
    description: string;
    stock: number;
    manufacturer: string;
}

@Table({tableName: "medications", timestamps: false})
export class Medication extends Model<Medication, IMedicationCreationAttr>{
    @ApiProperty({ 
        example: 1,
        description: "Medicationning uniqal ID raqami"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id:number

    @ApiProperty({
        example: "name",
        description: "Medication nomi",
    })
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    name: string;

    @ApiProperty({
        example: "description",
        description: "Medication tavsifi",
    })
    @Column({
        type: DataType.STRING
    })
    description: string;

    @ApiProperty({
        example: "soni",
        description: "Medication soni",
    })
    @Column({
        type: DataType.BIGINT
    })
    stock: number;

    @ApiProperty({
        example: "manufacturer",
        description: "Ishlab chiqqan manufacturer/fabrika ",
    })
    @Column({
        type: DataType.STRING
    })
    manufacturer: string;

    @HasMany(() => Prescription)
    prescription: Prescription[]
}
