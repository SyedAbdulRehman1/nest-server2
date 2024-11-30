import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';

@Module({
  imports: [JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, AuthService],
})
export class CategoryModule {}
