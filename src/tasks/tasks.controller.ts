import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, HttpException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import AuthenticatedRequest from 'src/types/express';
import { UserTaskPermissionGuard } from './user-task-permission/user-task-permission.guard';

@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles('admin', 'user')
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: AuthenticatedRequest) {
    const userId = request.user?.sub
    
    if(!userId) throw new HttpException('There was an error in the URL request', 400)

    return await this.tasksService.create(createTaskDto, userId);
  }

  @Roles('admin')
  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Roles('admin', 'user')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(+id);
  }

  @Roles('admin', 'user')
  @UseGuards(UserTaskPermissionGuard)
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    
    return await this.tasksService.update(+id, updateTaskDto);
  }

  @Roles('admin', 'user')
  @UseGuards(UserTaskPermissionGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    
    return await this.tasksService.update(+id, createTaskDto);
  
  }

  @Roles('admin', 'user')
  @UseGuards(UserTaskPermissionGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {

    return await this.tasksService.remove(+id);
  }
}