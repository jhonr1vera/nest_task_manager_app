import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthCommentsGuard } from './user-comment-permission/user-comment-permission.guard';
import { TasksService } from 'src/tasks/tasks.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [AuthModule, TasksModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, JwtService, UserAuthCommentsGuard, TasksService, UsersService],
})
export class CommentsModule {}
