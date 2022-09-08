import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { HelperService } from './helper/helper.service';
import { PrismaService } from './prisma/prisma.service';
import { HelperModule } from './helper/helper.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/roles/roles';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    HelperModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule,
    AccessControlModule.forRoles(roles)
  ],
  providers: [HelperService, PrismaService],
})
export class AppModule { }
