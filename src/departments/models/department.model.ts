import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Room } from "../../rooms/models/room.model";


interface IDepartmentCreationAttr{
    name: string;
    description: string;
}

@Table({tableName: "departments", timestamps: false})
export class Department extends Model<Department, IDepartmentCreationAttr>{
    @ApiProperty({ 
        example: 1,
        description: "Departmentning uniqal ID raqami"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id:number

    @ApiProperty({
        example: "name",
        description: "Mutaxassislik bo'limi",
    })
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    name: string;

    @ApiProperty({
        example: "description",
        description: "Mutaxassislik bo'limning tavsifi",
    })
    @Column({
        type: DataType.STRING
    })
    description: string;

    @HasMany(() => Room)
    room: Room[]
}
