import { IsDateString, IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
    @ApiProperty({
        example: '2025-05-08',
        description: 'Uchrashuv sanasi (ISO 8601 formatida)',
    })
    @IsDateString()
    appointment_date: Date;

    @ApiProperty({
        example: '2025-05-08T10:00:00',
        description: 'Uchrashuv vaqti (ISO 8601 formatida)',
    })
    @IsDateString()
    appointment_time: Date;

    @ApiProperty({
        example: 'Rejalashtirilgan',
        description: 'Uchrashuv holati (masalan, "Rejalashtirilgan", "Bajarildi")',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    status: string;

    @ApiProperty({
        example: 'Tekshiruv',
        description: 'Uchrashuv sababi',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    reason: string;

    @ApiProperty({
        example: 1,
        description: 'Bemorning ID raqami',
    })
    @IsInt()
    @Min(1)
    patient_id: number;

    @ApiProperty({
        example: 2,
        description: 'Shifokorning ID raqami',
    })
    @IsInt()
    @Min(1)
    doctor_id: number;

    @ApiProperty({
        example: 101,
        description: 'Uchrashuv xonasi ID raqami',
    })
    @IsInt()
    @Min(1)
    room_id: number;
}
