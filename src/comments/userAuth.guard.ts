import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service";

@Injectable()
export class userAuthGuard implements CanActivate{
    
    constructor(private prisma: PrismaService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const userId = request.user?.sub

        const commentIdUrl = request.params.id;

        const commentPostgres = await this.prisma.comments.findFirst({where: {
            id: parseInt(commentIdUrl)
        }})

        if(!commentIdUrl) throw new HttpException ('There was an error in the URL Request', 400)

        if (!commentPostgres) throw new HttpException('The comment does not exist', 404)

        if(userId !== commentPostgres.id) throw new HttpException('You do not have permission for change this comment', 403)

        return true
    }
}

// to validate comments