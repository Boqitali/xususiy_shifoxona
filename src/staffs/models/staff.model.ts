import {
    Table,
    Column,
    DataType,
    ForeignKey,
    Model,
    BelongsTo,
  } from 'sequelize-typescript';
  import { ApiProperty } from '@nestjs/swagger';
  import { Role } from '../../roles/models/role.model';
  
  interface IStaffCreationAttr {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    hashed_password: string;
    role_id: number;
  }
  
  @Table({ tableName: 'staff', timestamps: false })
  export class Staff extends Model<Staff, IStaffCreationAttr> {
    
    @ApiProperty({
      example: 1,
      description: "Xodimning ID raqami",
    })
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    declare id: number;
  
    @ApiProperty({
      example: 'Ali',
      description: "Xodimning ismi",
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    declare first_name: string;
  
    @ApiProperty({
      example: 'Valiyev',
      description: "Xodimning familiyasi",
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    declare last_name: string;
  
    @ApiProperty({
      example: 'alivaliyev@example.com',
      description: "Xodimning elektron pochtasi",
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    declare email: string;
  
    @ApiProperty({
      example: '+998901234567',
      description: "Xodimning telefon raqami",
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    declare phone: string;
  
    @ApiProperty({
      example: 'hashed_password_123',
      description: "Xodimning paroli (hashed)",
    })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    declare hashed_password: string;
    
    @ApiProperty({
      example: null,
      description: "Xodimning hashed_refresh_token",
    })
    @Column({
        type: DataType.STRING,
        defaultValue: null,
    })
    declare hashed_refresh_token: string;

    @ApiProperty({
        example: false,
        description: "Xodimning faolligi",
      })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
      })
    declare is_active: boolean;
    
    @ApiProperty({
      example: 1,
      description: "Xodimning roli ID raqami",
    })
    @ForeignKey(() => Role)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    declare role_id: number;

    @BelongsTo(() => Role)
    role: Role
  }
  