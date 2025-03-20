import { HttpException, Injectable, Patch, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class CommentsService {

  constructor(private prisma: PrismaService, private tasksService: TasksService){}

  async commentExist(commentId: number){

    const comment = await this.prisma.comments.findFirst({where: {
      id: commentId
  }})

    return comment

  }

  async create(createCommentDto: CreateCommentDto, userId: number, taskId: number) {

    await this.tasksService.ValidateTask(taskId)

    return await this.prisma.comments.create({data: {
      ...createCommentDto,
      user_id: userId,
      task_id: taskId
    }});
  }

  async findAllByTask(taskId: number){

    await this.tasksService.ValidateTask(taskId)

    return await this.prisma.comments.findMany({where: {task_id: taskId}})
  }

  async findOne(id: number, taskId: number) {

    const comment = await this.prisma.comments.findUnique({where: {id: id}})

    
    if (comment !== null && comment.task_id !== taskId) {
      throw new HttpException('The comment does not exist in this task', 404);
    }

    if(!comment) throw new HttpException('This comment does not exist', 404)

    return comment
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.prisma.comments.update({
      where: {id},
      data: updateCommentDto
    })
  }

  async remove(id: number) {
    return await this.prisma.comments.delete({where: {id}})
  }
}
