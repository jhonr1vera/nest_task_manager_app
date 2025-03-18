import { CanActivate, ExecutionContext, Injectable, HttpException } from '@nestjs/common'; 
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserTaskPermissionGuard implements CanActivate {

  constructor(private prisma: PrismaService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const userId = request.user?.sub
    const id = request.params.id
    const task_id = parseInt(id)
    
        const taskExists = await this.prisma.task.findUnique({where: {task_id}})
    
        if(!taskExists) throw new HttpException('The task does not exist', 404)
    
        if(taskExists.created_by_id !== userId ) throw new HttpException('You do not have permissions to perform this action', 403)

    return true;
  }
}
