import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { HelperService } from 'src/helper/helper.service';
import { Users } from './entities/user.entities';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private helperService: HelperService
  ) { }

  @Get('me')
  async UserFromHeader(@Req() req: Request) {
    const jwt = req.headers.authorization
    const token = (jwt.replace("Bearer ", ""))
    const user = await this.helperService.decodeToken(token)
    return this.usersService.findOne({ id: user.userId })
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(JwtGuard)
  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ id }, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id });
  }
}
