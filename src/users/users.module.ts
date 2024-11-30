// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService],
})
export class UsersModule {}
