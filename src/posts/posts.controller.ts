import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from 'src/auth/auth.guard';
import { Post as PostEntity } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private userService: UsersService
  ) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return this.postsService.findAll()
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne({ id })
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update({ id }, updatePostDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove({ id });
  }
}
