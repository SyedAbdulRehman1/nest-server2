import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ChapterController } from './chapters.controller';
import { ChaptersService } from './chapters.service';
import { MuxService } from './mux.service';

@Module({
  imports: [JwtModule],
  controllers: [ChapterController],
  providers: [ChaptersService, MuxService, PrismaService, AuthService],
})
export class ChapterModule {}
