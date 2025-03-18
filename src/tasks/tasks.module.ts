import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService, JwtService],
})
export class TasksModule {}
