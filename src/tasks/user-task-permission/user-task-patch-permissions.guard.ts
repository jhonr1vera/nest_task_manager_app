import { Injectable, CanActivate, ExecutionContext, HttpException } from "@nestjs/common"
import { TasksService } from "../tasks.service"

@Injectable()
export class UserTaskPatchPermissionGuard implements CanActivate {

  constructor(private tasksService: TasksService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const userId = request.user?.sub
    const id = request.params.id
    
    const taskExists = await this.tasksService.ValidateTask(+id)

    if(taskExists.assigned_user_id !== userId ) throw new HttpException('You do not have permissions to perform this action', 403)

    return true;
  }
}
