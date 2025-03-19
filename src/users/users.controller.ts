import { Controller, Get, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { userAuthGuard } from './user-permissions/userPermissions.guard';


@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Return all users (Only can be access by admins)'})
  @ApiResponse({status: 200, description: "users"})
  @Roles('admin')
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({summary: 'Return an user by id(Can be access by users and admins)'})
  @ApiResponse({status: 200, description: "user"})
  @ApiResponse({status: 404, description: "user not found"})
  @Roles('admin', 'user')
  @Get('profile/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @ApiOperation({summary: 'Update user by id (Can be access by users and admins but only if it is your profile)'})
  @ApiResponse({status: 404, description: "user not found"})
  @ApiResponse({status: 200, description: "return user updated"})
  @ApiResponse({status: 403, description: "user does not have permissions"})
  @Roles('admin', 'user')
  @Put(':id')
  @UseGuards(userAuthGuard)
  async update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {

    return await this.usersService.update(+id, createUserDto);
  }

  @ApiOperation({summary: 'Update partially user by id (Can be access by users and admins but only if it is your profile)'})
  @ApiResponse({status: 404, description: "user not found"})
  @ApiResponse({status: 200, description: "return user updated"})
  @ApiResponse({status: 403, description: "user does not have permissions"})
  @Roles('admin', 'user')
  @Patch(':id')
  @UseGuards(userAuthGuard)
  async updatePartial(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    
    return await this.usersService.update(+id, updateUserDto);
  }
  
  @ApiOperation({summary: 'Delete partially user by id (Can be access by users and admins but only if it is your profile)'})
  @ApiResponse({status: 404, description: "user not found"})
  @ApiResponse({status: 200, description: "return user deleted"})
  @ApiResponse({status: 403, description: "user does not have permissions"})
  @Roles('user')
  @Delete(':id')
  @UseGuards(userAuthGuard)
  async remove(@Param('id') id: string) {

    return await this.usersService.remove(+id);
  }
}
