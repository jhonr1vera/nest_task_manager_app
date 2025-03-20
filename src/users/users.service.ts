import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  async validateUser(id:number){

    const userExists = await this.prisma.user.findUnique({where: {id}})

    if(!userExists) throw new HttpException('The user does not exist', 404)

  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    if(users.length === 0) throw new HttpException('There is not users created', 204)

    return users

  }

  async findOne(id: number) {

    await this.validateUser(id)

    return this.prisma.user.findUnique({where: {id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    await this.validateUser(id)

    return await this.prisma.user.update({where: {id}, data: updateUserDto});
  }

  async remove(id: number) {

    await this.validateUser(id)

    return this.prisma.user.delete({where: {id}});
  }
}
