import { Model, Table, Column, DataType, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";// Agar alohida `Department` modeli bo'lsa
import { Department } from "../../departments/models/department.model";
import { Appointment } from "../../appointments/models/appointment.model";

interface IRoomCreationAttr {
  room_number: number;
  capacity: number;
  status: string;
  department_id: number;
}

@Table({ tableName: "room", timestamps: false })
export class Room extends Model<Room, IRoomCreationAttr> {
  @ApiProperty({ 
    example: 1, 
    description: "Xona uniqal ID raqami" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ 
    example: 101, 
    description: "Xona raqami" })
  @Column({
    type: DataType.INTEGER
  })
  declare room_number: number;

  @ApiProperty({ 
    example: "50", 
    description: "Xona sigimi" })
  @Column({
    type: DataType.INTEGER
  })
  declare capacity: number;

  @ApiProperty({ 
    example: "available", 
    description: "Xona holati (available, occupied, maintenance)" })
  @Column({
    type: DataType.STRING,
    defaultValue: "available",
  })
  status: string;

  @ApiProperty({ 
    example: 2, 
    description: "Departament ID raqami" })
  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER
  })
  department_id: number;

  @BelongsTo(() => Department)
  department:  Department

  @HasMany(() => Appointment)
  appointment: Appointment
}
