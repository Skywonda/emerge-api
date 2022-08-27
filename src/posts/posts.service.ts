import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService
  ) { }
  async create(data: Prisma.PostUncheckedCreateInput) {
    const authorExist = await this.userService.findOne({ id: data.authorId })
    if (!authorExist) {
      throw new BadRequestException('Author does not exist!')
    }
    return await this.prisma.post.create({ data })
  }

  async findAll() {
    const posts = await this.prisma.post.findMany({ include: { author: { select: { username: true } } } })
    return posts

  }

  async findOne(where: Prisma.PostWhereUniqueInput) {
    return await this.prisma.post.findUnique({ where });
  }

  async update(where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({
      where,
      data
    });
  }

  async remove(id: Prisma.PostWhereUniqueInput) {
    console.log(id)
    return this.prisma.post.delete({ where: id });
  }
}
