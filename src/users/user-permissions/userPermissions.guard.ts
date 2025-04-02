import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, HttpException, Injectable } from "@nestjs/common"

@Injectable()
export class userAuthGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const userId = request.user?.sub
        const id = request.params.id

        if (!userId) {
            throw new BadRequestException('There was an error in the request');
          }
      
          if (userId !== parseInt(id)) {
            throw new ForbiddenException('You do not have permissions to perform this action');
          }

        return true
    }
}