import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ChaptersService } from './chapters/chapters.service';
import { MuxService } from './chapters/mux.service';

@Module({
  imports: [JwtModule],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    ChaptersService,
    MuxService,
    PrismaService,
    AuthService,
  ],
})
export class CoursesModule {}
