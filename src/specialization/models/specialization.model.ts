import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.model";


interface ISpecializationCreationAttr{
    name: string;
    description: string;
}

@Table({tableName: "specialization", timestamps: false})
export class Specialization extends Model<Specialization, ISpecializationCreationAttr>{
    @ApiProperty({ 
        example: 1,
        description: "Specializationning uniqal ID raqami"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id:number

    @ApiProperty({ 
        example: "name",
        description: "Mutaxassislik nomi"
    })
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    name: string;

    @ApiProperty({
        example: "description",
        description: "Mutaxassislik tavsifi",
    })
    @Column({
        type: DataType.STRING
    })
    description: string;

    @HasMany(() => Doctor)
    doctor: Doctor[]
}
