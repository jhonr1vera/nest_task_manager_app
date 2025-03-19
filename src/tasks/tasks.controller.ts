import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import AuthenticatedRequest from 'src/types/express';
import { UserTaskPermissionGuard } from './user-task-permission/user-task-permission.guard';
import { UserTaskPatchPermissionGuard } from './user-task-permission/user-task-patch-permissions.guard';
import { UpdateTaskStatusDto } from './dto/update-task-status';


@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}


  @ApiOperation({summary: 'Create a new task (Can be access by users and admins)'})
  @ApiResponse({status: 200, description: "task created"})
  @Roles('admin', 'user')
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: AuthenticatedRequest) {
    const userId = request.user?.sub

    return await this.tasksService.create(createTaskDto, userId);
  }

  @ApiOperation({summary: 'Return all tasks (Can be access by users and admins)'})
  @ApiResponse({status: 200, description: "tasks"})
  @Roles('admin', 'user')
  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @ApiOperation({summary: 'Return a tasks by id (Can be access by users and admins)'})
  @ApiResponse({status: 200, description: "task"})
  @ApiResponse({status: 404, description: "task not found"})
  @Roles('admin', 'user')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(+id);
  }


  @ApiOperation({summary: 'Update partially a tasks by id (Can be access by users and admins but only if it is your task)'})
  @ApiResponse({status: 200, description: "task"})
  @ApiResponse({status: 404, description: "task not found"})
  @ApiResponse({status: 403, description: "no permissions to perform this action"})
  @Roles('admin', 'user')
  @UseGuards(UserTaskPermissionGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    
    return await this.tasksService.update(+id, createTaskDto);
  
  }

  @ApiOperation({summary: 'Update partially a tasks by id (Can be access by users and admins but only if it is your task)'})
  @ApiResponse({status: 200, description: "updated task"})
  @ApiResponse({status: 404, description: "task not found"})
  @ApiResponse({status: 403, description: "no permissions to perform this action"})
  @Roles('admin', 'user')
  @UseGuards(UserTaskPermissionGuard)
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {

    return await this.tasksService.update(+id, updateTaskDto);
  }

  @ApiOperation({summary: 'Update status tasks by id (Can be access by users and admins but only if you are the assigned user)'})
  @ApiResponse({status: 200, description: "updated status task"})
  @ApiResponse({status: 404, description: "task not found"})
  @ApiResponse({status: 403, description: "no permissions to perform this action"})
  @Roles('admin', 'user')
  @UseGuards(UserTaskPatchPermissionGuard)
  @Patch('status/:id')
  async updateTaskAssignedUser(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @Req() request: AuthenticatedRequest) {
    const userId = request.user?.sub

    return await this.tasksService.updateStatus(+id, updateTaskStatusDto);
  }

  @ApiOperation({summary: 'Delete tasks by id (Can be access by users and admins but only if you are the assigned user)'})
  @ApiResponse({status: 200, description: "deleted task"})
  @ApiResponse({status: 404, description: "task not found"})
  @ApiResponse({status: 403, description: "no permissions to perform this action"})
  @Roles('admin', 'user')
  @UseGuards(UserTaskPermissionGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {

    return await this.tasksService.remove(+id);
  }
}