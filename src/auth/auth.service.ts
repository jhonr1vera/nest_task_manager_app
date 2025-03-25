import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

// TODO: None of these prismas interaction can throw errors? I think they can and you should handle them
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

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
        throw new HttpException('User not found', 404);
    }

    if(userExists.password !== loginDto.password) {
        throw new HttpException('Invalid password', 401);
    }

    const Payload = { email: loginDto.email, sub: userExists.id, role: userExists.role};
    return {
       access_token: await this.jwtService.signAsync(Payload),
    };
    
     
  }
}
