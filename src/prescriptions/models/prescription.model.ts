import {
    Table,
    Column,
    DataType,
    ForeignKey,
    Model,
    BelongsTo,
  } from 'sequelize-typescript';
  import { ApiProperty } from '@nestjs/swagger';
  import { MedicalRecord } from '../../medical_records/models/medical_record.model';
  import { Medication } from '../../medications/models/medication.model';
  
  interface IPrescriptionCreationAttr {
    dosage: string;
    frequency: string;
    duration: string;
    medical_record_id: number;
    medication_id: number;
  }
  
  @Table({ tableName: 'prescription', timestamps: false })
  export class Prescription extends Model<Prescription, IPrescriptionCreationAttr> {
    
    @ApiProperty({
      example: 1,
      description: "Retsept ID raqami",
    })
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    declare id: number;
  
    @ApiProperty({
      example: '500mg',
      description: "Dori miqdori",
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    declare dosage: string;
  
    @ApiProperty({
      example: '2 times a day',
      description: "Qabul qilish chastotasi",
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    declare frequency: string;
  
    @ApiProperty({
      example: '7 days',
      description: "Davolanish muddati",
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    declare duration: string;
  
    @ApiProperty({
      example: 101,
      description: "Tibbiy yozuv ID raqami",
    })
    @ForeignKey(() => MedicalRecord)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare medical_record_id: number;
  
    @ApiProperty({
      example: 202,
      description: "Dori ID raqami",
    })
    @ForeignKey(() => Medication)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare medication_id: number;


    @BelongsTo(() => MedicalRecord)
    medical_record: MedicalRecord

    @BelongsTo(() => Medication)
    medication: Medication
  }
  