import { Injectable, Patch, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {

  constructor(private prisma: PrismaService){}

  create(createCommentDto: CreateCommentDto, userId: number, taskId) {
    return this.prisma.comments.create({data: {
      ...createCommentDto,
      user_id: userId,
      task_id: taskId
    }});
  }

  findAll() {
    return this.prisma.comments.findMany
  }

  findOne(id: number) {
    return this.prisma.comments.findUnique({where: {id}})
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comments.update({
      where: {id},
      data: updateCommentDto
    })
  }

  remove(id: number) {
    return this.prisma.comments.delete({where: {id}})
  }
}
