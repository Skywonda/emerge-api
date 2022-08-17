import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HelperModule } from 'src/helper/helper.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HelperModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService]
})
export class UsersModule { }
