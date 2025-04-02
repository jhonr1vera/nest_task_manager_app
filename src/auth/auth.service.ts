import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import {Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async register(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async login(loginDto: LoginDto): Promise<{access_token: string}> {
    
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email
      },
    });

    if(!userExists) {
        throw new NotFoundException('User not found');
    }

    if(userExists.password !== loginDto.password) {
        throw new UnauthorizedException('Invalid password');
    }

    const Payload = { email: loginDto.email, sub: userExists.id, role: userExists.role};
    return {
       access_token: await this.jwtService.signAsync(Payload),
    };
    
     
  }
}
