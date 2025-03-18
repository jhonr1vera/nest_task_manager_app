import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import AuthenticatedRequest from 'src/types/express';

@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles('admin', 'user')
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: AuthenticatedRequest) {
    const userId = request.user?.sub

    return await this.tasksService.create(createTaskDto, userId);
  }

  @Roles('admin', 'user')
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
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const taskId = parseInt(id)
    return await this.tasksService.update(taskId, updateTaskDto);
  }

  @Roles('admin', 'user')
  @Put(':id')
  async update(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    const taskId = parseInt(id)
    return await this.tasksService.update(taskId, createTaskDto);
  }

  @Roles('admin', 'user')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(+id);
  }
}
