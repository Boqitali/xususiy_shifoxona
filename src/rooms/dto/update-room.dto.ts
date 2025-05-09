import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    room_number: number;
    capacity: number;
    status: string;
    department_id: number;
}   
