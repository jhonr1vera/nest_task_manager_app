import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { CommentsService } from "../comments.service";

@Injectable()
export class UserAuthCommentsGuard implements CanActivate{
    
    constructor(private commentsService: CommentsService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest()
        const userId = request.user?.sub
        const commentIdUrl = parseInt(request.params.id);

        const commentPostgres = await this.commentsService.commentExist(commentIdUrl)

        if(!commentIdUrl) throw new BadRequestException ('There was an error in the URL Request')

        if (!commentPostgres) throw new NotFoundException ('The comment does not exist')

        if(userId !== commentPostgres.user_id) throw new ForbiddenException ('You do not have permission to change this comment')

        return true
    }
}