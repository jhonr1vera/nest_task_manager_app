import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common"

@Injectable()
export class userAuthGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const userId = request.user?.sub
        const id = request.params.id

        if (!userId) {
            throw new HttpException('There was an error in the request', 400);
          }
      
          if (userId !== parseInt(id)) {
            throw new HttpException('You do not have permissions to perform this action', 403);
          }

        return true
    }
}