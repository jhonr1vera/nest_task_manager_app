import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, UsersModule, CommentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
