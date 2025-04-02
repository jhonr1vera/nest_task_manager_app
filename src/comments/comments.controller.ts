import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserAuthCommentsGuard } from './user-comment-permission/user-comment-permission.guard';
import AuthenticatedRequest from 'src/types/express';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}


  @ApiOperation({summary: 'create a comment in a tasks (Can be access by users and admins)'})
  @ApiResponse({status: 200, description: "return comment"})
  @ApiResponse({status: 404, description: "task not found"})
  @Roles('user', 'admin')
  @Post()
  async create(
    @Param('taskId') taskId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user?.sub;
    return await this.commentsService.create(createCommentDto, userId, +taskId);
  }

  @ApiOperation({summary: 'return all comments by task (Can be access by admins and users)'})
  @ApiResponse({status: 200, description: "return comments by task"})
  @Roles('user', 'admin')
  @Get()
  async findAllByTask(@Param('taskId') taskId: number) {
    return await this.commentsService.findAllByTask(+taskId);
  
  }

  @ApiOperation({summary: 'return a comment by task (Can be access by admins and users)'})
  @ApiResponse({status: 200, description: "return comment"})
  @ApiResponse({status: 404, description: "this comment does not exist"})
  @Roles('user', 'admin')
  @Get(':id')
  async findOne(@Param('id') id: string, @Param('taskId') taskId:number) {
    
    const comment = await this.commentsService.findOne(+id, +taskId);

    return comment;
  }

  @ApiOperation({summary: 'Update the comment (Can be access by admins and users but if it is your comment)'})
  @ApiResponse({status: 200, description: "return updated comment"})
  @Roles('user', 'admin')
  @UseGuards(UserAuthCommentsGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {

    return await this.commentsService.update(+id, updateCommentDto);
  
  }

  @ApiOperation({summary: 'Delete the comment (Can be access by admins and users but if it is your comment)'})
  @ApiResponse({status: 200, description: "return deleted comment"})
  @Roles('user', 'admin')
  @UseGuards(UserAuthCommentsGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {

    return await this.commentsService.remove(+id);
  
  }
}
