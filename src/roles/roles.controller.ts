import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from './models/role.model';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({summary: "Rolelarni qo'shish"})
  @ApiResponse({
    status: 201,
    description: "Create role",
    type: Role
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({summary: "Barcha rolelar olish"})
  @ApiResponse({
    status: 200,
    description: "List of role",
    type: [Role]
  })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({summary: "Role id bilan olish"})
  @ApiResponse({
    status: 200,
    description: "List of role",
    type: Role
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @ApiOperation({summary: "Role id bilan yangilash"})
  @ApiResponse({
    status: 200,
    description: "Update role",
    type: Role
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiOperation({summary: "Roleni id bilan o'chrish"})
  @ApiResponse({
    status: 200,
    description: "Role delete",
    type: Role
  })
  @ApiOperation({summary: ""})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
