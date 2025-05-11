import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Room } from './models/room.model';
import { Roles } from '../common/decorators/rols.auth-decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles("superadmin", "admin",)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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

  @Roles("superadmin", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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
