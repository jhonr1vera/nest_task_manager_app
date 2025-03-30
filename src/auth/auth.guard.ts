import {
    CanActivate,
    ExecutionContext,
    GoneException,
    Injectable,
    UnauthorizedException
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { AuthService } from './auth.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private authService: AuthService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const token = this.authService.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException('Token does not exist');
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
        throw new GoneException('Token invalid or expired');
      }
      return true;
    }

  }
  