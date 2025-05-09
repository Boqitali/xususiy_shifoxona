import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Room } from './models/room.model';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({summary: "Roomlarni qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Create room",
    type: Room
  })
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @ApiOperation({summary: "Barcha roomlarni olish"})
  @ApiResponse({
    status: 200,
    description: "List of room",
    type: [Room]
  })
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @ApiOperation({summary: "Roomni id bilan olish"})
  @ApiResponse({
    status: 200,
    description: "Rommni id orqali ko'rish",
    type: Room
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @ApiOperation({summary: "Roomni id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description: "Update room",
    type: Room
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @ApiOperation({summary: "Roomni id bilan o'chirish"})
  @ApiResponse({
    status: 200,
    description: "Delete room",
    type: Room
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
