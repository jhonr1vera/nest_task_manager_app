import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'; 
import { TasksService } from '../tasks.service';

@Injectable()
export class UserTaskPermissionGuard implements CanActivate {

  constructor(private tasksService: TasksService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const userId = request.user?.sub
    const id = request.params.id
    const task_id = parseInt(id)
    
    const taskExists = await this.tasksService.ValidateTask(task_id)

    if(taskExists.created_by_id !== userId ) throw new ForbiddenException('You do not have permissions to perform this action')

    return true;
  }
}
