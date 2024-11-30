import {
  Controller,
  Get,
  Param,
  Redirect,
  UseGuards,
  UnauthorizedException,
  Patch,
  Body,
  Req,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // For auth guard
import { PrismaService } from 'src/prisma/prisma.service';
import { ChaptersService } from './chapters.service';
import { UpdateChapterDto } from './dto/update-chapter.dto';
// import { PrismaService } from './prisma.service'; // Assuming you have a Prisma service to interact with DB
// import { SessionService } from './session.service'; // Assuming you have a session management service
import { Request } from 'express';

@Controller('chapters')
@UseGuards(AuthGuard('jwt'))
export class ChapterController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chaptersService: ChaptersService, // private readonly sessionService: SessionService, // For session management // For interacting with the database
  ) {}

  @Get(':courseId/chapters/:chapterId')
  async getChapter(
    @Param('courseId') courseId: string,
    @Param('chapterId') chapterId: string,
  ) {
    return this.chaptersService.getChapterWithCompletion(courseId, chapterId);
  }

  @Get('get-chapter')
  async getChapterData(
    @Query('courseId') courseId: string,
    @Query('chapterId') chapterId: string,
    @Req() req: Request,
  ) {
    // const session = await this.authService.getSession(); // Get session from AuthService

    // if (!session || !session.user) {
    //   throw new ForbiddenException('Unauthorized');
    // }
    const userId = req.user['id']; // Extract userId from the request (assuming user is set in the request)

    // const userId = session.user.id;
    try {
      return await this.chaptersService.getChapterData(
        userId,
        courseId,
        chapterId,
      );
    } catch (error) {
      throw error;
    }
  }

  @Patch(':courseId/chapters/:chapterId')
  async updateChapter(
    @Param('courseId') courseId: string,
    @Param('chapterId') chapterId: string,
    @Body() updateChapterDto: UpdateChapterDto,
    @Req() req: Request,
  ) {
    try {
      console.log(req, 'reee');
      // const userId = req.user?.id;
      // if (!userId) {
      //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      // }
      // const chapter = await this.chaptersService.updateChapter(
      //   courseId,
      //   chapterId,
      //   updateChapterDto,
      // );
      // return { chapter, message: 'Chapter updated successfully' };
    } catch (error) {
      throw error;
    }
  }
}
