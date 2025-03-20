import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService, private usersService: UsersService, private eventEmitter: EventEmitter2) {}

    async ValidateTask(id?: number){

    const taskExist = await this.prisma.task.findUnique({
      where: {task_id: id}
    })
  
    if(!taskExist) throw new HttpException('This task does not exist', 404)

    return taskExist

  }

  async create(createTaskDto: CreateTaskDto, userId: number) {

    await this.usersService.validateUser(createTaskDto.assigned_user)

    const task = await this.prisma.task.create({
      data: {
      ...createTaskDto,
      created_by: { connect: { id: userId } },
      assigned_user: { connect: { id: createTaskDto.assigned_user } },
      }
  });

    return task;
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany()

    if(tasks.length === 0) throw new HttpException('There is not tasks created', 204)

    return tasks
  }

  async findOne(id: number) {
    
    const task = this.ValidateTask(id)

    return task

  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto, userId: number) {

    if (updateTaskDto.assigned_user === undefined) {
      throw new HttpException('There was an error in the request, assigned user needed', 400);
    }

    await this.usersService.validateUser(updateTaskDto.assigned_user)

    await this.ValidateTask(taskId)

    const updatedTask = await this.prisma.task.update({
      where: { task_id: taskId },
      data: {
        ...updateTaskDto,
        assigned_user: { connect: { id: updateTaskDto.assigned_user } }
      },
    });

    this.eventEmitter.emit('update.task',{
      task_id: updatedTask.task_id,
      user_id: userId,
      action: 'Update'
    })

    return updatedTask
    
  }

  async updateStatus(taskId: number, updateTaskStatusDto: UpdateTaskStatusDto, userId: number){
    
    await this.ValidateTask(taskId)
    
    const updatedTaskStatus = await this.prisma.task.update({
      where: { task_id: taskId },
      data: updateTaskStatusDto,
    });

    this.eventEmitter.emit('update.task.status',{
      task_id: taskId,
      user_id: userId,
      action: 'Update Status'
    })

    return updatedTaskStatus

  }

  async remove(taskId: number) {

    await this.ValidateTask(taskId)

    return await this.prisma.task.delete({
      where: {task_id: taskId}
    })
  }
}
