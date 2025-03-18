import { HttpException, Injectable, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {

  constructor(private readonly prisma: PrismaService) {}

  private async validateUser(id?: number){

    const userExists = await this.prisma.user.findUnique({where: {id}})

    if(!userExists) throw new HttpException('The user does not exist', 404)

  }

  async create(createTaskDto: CreateTaskDto, userId: number) {

    await this.validateUser(createTaskDto.assigned_user)

    return await this.prisma.task.create({
      data: {
      ...createTaskDto,
      created_by: { connect: { id: userId } },
      assigned_user: { connect: { id: createTaskDto.assigned_user } },
      }
  });
  }

  async findAll() {
    return await this.prisma.task.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.task.findUnique({where: {task_id: id}})
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto) {

    await this.validateUser(updateTaskDto.assigned_user)

    return await this.prisma.task.update({
      where: { task_id: taskId },
      data: {
        ...updateTaskDto,
        assigned_user: { connect: { id: updateTaskDto.assigned_user } }
      },
    });
  }

  async remove(taskId: number) {
    return await this.prisma.task.delete({
      where: {task_id: taskId}
    })
  }
}
