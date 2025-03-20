import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserTaskPermissionGuard } from './user-task-permission/user-task-permission.guard';
import { UserTaskPatchPermissionGuard } from './user-task-permission/user-task-patch-permissions.guard';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TaskHistoryModule } from 'src/task-history/task-history.module';

@Module({
  imports: [AuthModule, UsersModule, TaskHistoryModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService, JwtService, UserTaskPermissionGuard, UserTaskPatchPermissionGuard, UsersService],
  exports: [TasksService]
})
export class TasksModule {}
