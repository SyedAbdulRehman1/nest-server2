import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { MuxService } from './mux.service';

@Injectable()
export class ChaptersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly muxService: MuxService,
  ) {}

  // Get the next available position for the new chapter
  async getNextPosition(courseId: string) {
    const lastChapter = await this.prisma.chapter.findFirst({
      where: { courseId },
      orderBy: { position: 'desc' },
    });

    return lastChapter ? lastChapter.position + 1 : 1;
  }

  // Create a new chapter
  async create(data: { title: string; courseId: string; position: number }) {
    return this.prisma.chapter.create({
      data,
    });
  }

  async getChapterWithCompletion(courseId: string, chapterId: string) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
      include: { muxData: true },
    });

    if (!chapter || chapter.courseId !== courseId) {
      throw new Error('Chapter not found or unauthorized access');
    }

    const requiredFields = [
      chapter.title,
      chapter.description,
      chapter.videoUrl,
    ];
    const completedFields = requiredFields.filter(Boolean).length;
    const totalFields = requiredFields.length;

    const isComplete = completedFields === totalFields;
    const completionText = `(${completedFields}/${totalFields})`;

    return {
      chapter,
      isComplete,
      completionText,
    };
  }

  async updateChapter(
    courseId: string,
    chapterId: string,
    updateChapterDto: UpdateChapterDto,
    userId: string,
  ) {
    const ownCourse = await this.prisma.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!ownCourse) {
      throw new UnauthorizedException('Unauthorized');
    }

    // Update the chapter with the provided data
    const chapter = await this.prisma.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: updateChapterDto,
    });
    if (updateChapterDto.videoUrl) {
      await this.muxService.uploadVideoToMux(
        updateChapterDto.videoUrl,
        chapterId,
      );
    }

    return chapter;
  }

  async getChapterData(userId: string, courseId: string, chapterId: string) {
    try {
      const purchase = await this.prisma.purchase.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      const course = await this.prisma.course.findUnique({
        where: {
          isPublished: true,
          id: courseId,
        },
        select: {
          price: true,
        },
      });

      const chapter = await this.prisma.chapter.findUnique({
        where: {
          id: chapterId,
          isPublished: true,
        },
      });

      if (!chapter || !course) {
        throw new NotFoundException('Chapter or course not found');
      }

      let muxData = null;
      let attachments = [];
      let nextChapter = null;

      if (purchase) {
        attachments = await this.prisma.attachment.findMany({
          where: {
            courseId: courseId,
          },
        });
      }

      if (chapter.isFree || purchase) {
        muxData = await this.prisma.muxData.findUnique({
          where: {
            chapterId: chapterId,
          },
        });

        nextChapter = await this.prisma.chapter.findFirst({
          where: {
            courseId: courseId,
            isPublished: true,
            position: {
              gt: chapter.position,
            },
          },
          orderBy: {
            position: 'asc',
          },
        });
      }

      const userProgress = await this.prisma.userProgress.findUnique({
        where: {
          userId_chapterId: {
            userId,
            chapterId,
          },
        },
      });

      return {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
      };
    } catch (error) {
      console.error('[GET_CHAPTER]', error);
      throw new InternalServerErrorException(
        'Internal Server Error In Chapter Service',
      );
    }
  }

  // private async handleMuxData(chapterId: string, videoUrl: string) {
  //   const existingMuxData = await this.prisma.muxData.findFirst({
  //     where: { chapterId },
  //   });

  //   if (existingMuxData) {
  //     await this.prisma.muxData.delete({
  //       where: { id: existingMuxData.id },
  //     });
  //   }

  //   // Handle Mux video upload via the Mux service
  //   const asset = await this.muxService.uploadToMux(videoUrl);

  //   // Save the Mux data to the database
  //   await this.prisma.muxData.create({
  //     data: {
  //       chapterId,
  //       assetId: asset.id,
  //       playbackId: asset.playback_ids?.[0]?.id,
  //     },
  //   });
  // }

  private async getSessionFromRequest() {
    // Implement your session or JWT extraction logic here
    return { user: { id: 'user-id-from-session' } }; // Example response
  }
}
// }
