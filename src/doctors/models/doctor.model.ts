import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Specialization } from "../../specialization/models/specialization.model";
import { Appointment } from "../../appointments/models/appointment.model";
import { LabTest } from "../../lab_tests/models/lab_test.model";

interface IDoctorCreationAttr {
  full_name: string;
  picture: string;
  phone: string;
  email: string;
  hashed_password: string;
  specialization_id: number;
}

@Table({ tableName: "doctors", timestamps: false })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
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
    example: "Ali Valiyev",
    description: "Doctorning ism familiyasi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "profile.jpg",
    description: "Doctorning rasmi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare picture: string;

  @ApiProperty({
    example: "+998916066606",
    description: "Doctorning telefon raqami",
  })
  @Column({
    type: DataType.STRING(15),
    unique: true,
    allowNull: false,
  })
  declare phone: string;

  @ApiProperty({
    example: "doctor@gmail.com",
    description: "Doctorning email pochtasi",
  })
  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @ApiProperty({
    example: "hashedpassword123",
    description: "Doctorning paroli",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare hashed_password: string;

  @ApiProperty({
    example: null,
    description: "Doctorning hashed_refresh_token",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  declare hashed_refresh_token: string;

  @ApiProperty({
    example: false,
    description: "Doctorning faolligi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @ForeignKey(() => Specialization)
  @ApiProperty({
    example: 1,
    description: "Specializationning id raqami",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare specialization_id: number;

  @BelongsTo(() => Specialization)
  specialization: Specialization;


  @HasMany(() => Appointment)
  appointment: Appointment[]

  @HasMany(() => LabTest)
  labTest: LabTest[]
}
