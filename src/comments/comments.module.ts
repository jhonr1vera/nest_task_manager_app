import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { userAuthGuard } from './userAuth.guard';

@Module({
  imports: [AuthModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, JwtService, userAuthGuard],
  exports: [userAuthGuard]
})
export class CommentsModule {}
