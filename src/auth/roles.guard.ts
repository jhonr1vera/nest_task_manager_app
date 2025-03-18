import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext ): boolean {
        const requiredRoles = this.reflector.get<string[]>(process.env.ROLES_KEY, context.getHandler());
        
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const userRole = request.user?.role;

        if (!requiredRoles.includes(userRole)) {
            throw new HttpException('Does not have permission to access this route', 403);
        }

        return true;
    }
}