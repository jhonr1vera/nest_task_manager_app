import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @ApiOperation({summary: 'Create a new user'})
  @ApiResponse({status: 200, description: "return user"})
  @Post('register')
    @UsePipes(new ValidationPipe()) //* validation pipe local
    create(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
  }

  @ApiOperation({summary: 'Create a new user'})
  @ApiResponse({status: 200, description: "return access token (bearer)"})
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
