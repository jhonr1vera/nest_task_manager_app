import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskHistoryService {
  private readonly logger = new Logger(TaskHistoryService.name);

  constructor(private prisma: PrismaService) {}

  @OnEvent('update.task.status')
  @OnEvent('update.task')
  async createHistoryRecord(payload: {
    task_id: number;
    user_id: number;
    action: string;
  }) {
    try {
      await this.prisma.task_history.create({
        data: {
          task: { connect: { task_id: payload.task_id } }, 
          user: { connect: { id: payload.user_id } }, 
          action: payload.action,
        },
      });
      this.logger.log(`History record created for task ${payload.task_id}`);
    } catch (error) {
      this.logger.error('Error creating history record:', error);
      throw error;
    }
  }
}