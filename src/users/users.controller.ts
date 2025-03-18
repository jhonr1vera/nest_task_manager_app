import { Controller, Get, Body, Patch, Param, Delete, Put, UseGuards, Req, HttpException } from '@nestjs/common';
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

  @Roles('admin')
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles('admin', 'user')
  @Get('profile/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Roles('admin', 'user')
  @Put(':id')
  @UseGuards(userAuthGuard)
  async update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {

    return await this.usersService.update(+id, createUserDto);
  }

  @Roles('admin', 'user')
  @Patch(':id')
  @UseGuards(userAuthGuard)
  async updatePartial(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    
    return await this.usersService.update(+id, updateUserDto);
  }

  @Roles('user')
  @Delete(':id')
  @UseGuards(userAuthGuard)
  async remove(@Param('id') id: string) {

    return await this.usersService.remove(+id);
  }
}
