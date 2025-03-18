import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { userAuthGuard } from './userAuth.guard';
import AuthenticatedRequest from 'src/types/express';

@UseGuards(AuthGuard, RolesGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Roles('user', 'admin')
  @Post(':taskId')
  create(@Param('taskId') id :number, @Body() createCommentDto: CreateCommentDto,
  @Req() request: AuthenticatedRequest
  ) {
    const userId = request.user?.sub
    const taskId = id

    if(!taskId) throw new HttpException('There was an error in the request', 400)
    if (!userId) throw new HttpException('There was an error in the request', 400)

    return this.commentsService.create(createCommentDto, userId, taskId);
  }

  @Roles('user', 'admin')
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Roles('user', 'admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @UseGuards(userAuthGuard)
  @Roles('user', 'admin')
  @Patch(':taskId/:commentId')
  update(@Param('taskId') taskId: string,
  @Param('commentId') commentId , 
  @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+taskId, updateCommentDto);
  }

  @UseGuards(userAuthGuard)
  @Roles('user', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
