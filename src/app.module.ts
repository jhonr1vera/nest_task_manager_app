import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TaskHistoryModule } from './task-history/task-history.module';

@Module({
  imports: [TasksModule, UsersModule, CommentsModule, AuthModule, EventEmitterModule.forRoot(), TaskHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
