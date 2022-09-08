import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { use } from 'passport';
import { HelperService } from 'src/helper/helper.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from './entities/user.entities';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private helperService: HelperService
  ) { }
  async create(data: Prisma.UserCreateInput) {
    const userExist = await this.prisma.user.findUnique({ where: { username: data.username } })
    if (userExist) {
      throw new ConflictException("This username already exist!")
    }
    const emailExist = await this.prisma.user.findUnique({ where: { email: data.email } })
    if (emailExist) {
      throw new ConflictException("This email already exist")
    }

    data.password = await this.helperService.hashPassword(data.password)
    const user = await this.prisma.user.create({ data })
    delete user.password
    return user

  }

  async findAll(): Promise<Users[]> {
    const user = await this.prisma.user.findMany();
    user.map((each) => {
      delete each.password
    })
    return user
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where,
      include: {
        post: true
      }
    });
  }

  async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    const userExist = this.prisma.user.findUnique({ where })
    if (!userExist) {
      throw new NotFoundException("User not found")
    }
    return this.prisma.user.update({
      where,
      data
    })
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    const userExist = await this.prisma.user.findUnique({ where })
    if (!userExist) {
      throw new NotFoundException("User to delete does not exist!")
    }
    return this.prisma.user.delete({ where });
  }
}
