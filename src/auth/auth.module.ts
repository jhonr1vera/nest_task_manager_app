import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
    imports: [
        JwtModule.register({
            privateKey: process.env.JWT_SECRET,
            signOptions: { expiresIn: '6h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, AuthGuard, RolesGuard],
    exports: [AuthService, AuthGuard, RolesGuard],
})
export class AuthModule {}
