import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { HelperModule } from 'src/helper/helper.module';
import { LocalStrategy } from './strategy/auth.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.ACCESS_TOKEN_SECRET,
    signOptions: { expiresIn: "60" },
  }), HelperModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, UsersService],
  exports: [AuthService]
})
export class AuthModule { }
