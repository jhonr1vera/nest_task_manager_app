import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        // TODO: Create Exception types cross for all the modules, so you can standardize the error responses
        // , avoid measleading errors and thet you could send all the required information
        throw new HttpException('Token not found', 401);
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET,
          }
        );
        request['user'] = payload;
      } catch {
        // TODO: The "token invalid: token and the "token not found" can not be the same error
        throw new HttpException('Invalid token', 401);
      }
      return true;
    }
  
    // TODO: I think this logic needs to be a part from the module, because it's not really attch to the auth feature,
    // but to the whole app
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }

//   headers authorization works in guards and middlewares without type exceptions
  