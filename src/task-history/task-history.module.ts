import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TaskHistoryService } from './task-history.service';

@Module({
    providers: [TaskHistoryService, PrismaService, JwtService]
})
export class TaskHistoryModule {
    
}
