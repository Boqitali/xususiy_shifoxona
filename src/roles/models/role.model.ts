import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Staff } from "../../staffs/models/staff.model";


interface IRoleCreationAttr{
    name: string;
    description: string;
}

@Table({tableName: "roles", timestamps: false})
export class Role extends Model <Role, IRoleCreationAttr>{
    @ApiProperty({ 
        example: 1,
        description: "Rolening uniqal ID raqami"
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id:number

    @ApiProperty({
        example: "patient",
        description: "Role nomi",
    })
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    name: string;

    @ApiProperty({
        example: "role",
        description: "Role tavsifi",
    })
    @Column({
        type: DataType.STRING
    })
    description: string;

    @HasMany(() => Staff)
    staff: Staff
}
