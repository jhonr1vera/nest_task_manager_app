import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common"
import { CommentsService } from "../comments.service";

@Injectable()
export class UserAuthCommentsGuard implements CanActivate{
    
    constructor(private commentsService: CommentsService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest()
        const userId = request.user?.sub
        const commentIdUrl = parseInt(request.params.id);

        const commentPostgres = await this.commentsService.commentExist(commentIdUrl)

        if(!commentIdUrl) throw new HttpException ('There was an error in the URL Request', 400)

        if (!commentPostgres) throw new HttpException('The comment does not exist', 404)

        if(userId !== commentPostgres.user_id) throw new HttpException('You do not have permission to change this comment', 403)

        return true
    }
}