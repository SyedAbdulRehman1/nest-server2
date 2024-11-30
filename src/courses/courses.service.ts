import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
// import { CreateCourseDto } from '/dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCoursesByUser(userId: string) {
    try {
      return await this.prisma.course.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Error in getCoursesByUser:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCourse(userId: string, createCourseDto: CreateCourseDto) {
    try {
      const { title } = createCourseDto;
      return await this.prisma.course.create({
        data: {
          userId,
          title,
        },
      });
    } catch (error) {
      console.error('[CREATE COURSE]', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create course',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getCourseByIdAndUser(courseId: string, userId: string) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: courseId,
          userId: userId,
        },
        include: {
          chapters: { orderBy: { position: 'asc' } },
          attachments: { orderBy: { createdAt: 'desc' } },
        },
      });

      return course;
    } catch (error) {
      console.error('Error in getCourseByIdAndUser:', error);
      throw new HttpException(
        'Error fetching course details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCourseById(courseId: string, userId: string) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: courseId,
          userId: userId,
        },
        include: {
          chapters: {
            where: { isPublished: true },
            orderBy: { position: 'asc' },
          },
        },
      });

      if (!course) {
        throw new NotFoundException('Course not found');
      }

      return course;
    } catch (error) {
      throw new UnauthorizedException('Error fetching course details');
    }
  }

  async getCourseWithProgress(courseId: string, userId: string) {
    try {
      // Fetch course details with related chapters and user progress
      const course = await this.prisma.course.findUnique({
        where: { id: courseId },
        include: {
          chapters: {
            where: { isPublished: true },
            include: {
              userProgress: { where: { userId } },
            },
            orderBy: { position: 'asc' },
          },
        },
      });

      if (!course) {
        return null; // No course found
      }

      // Calculate progress
      const progressCount = await this.getProgress(userId, courseId);

      return { course, progressCount };
    } catch (error) {
      console.error('[GET_COURSE_WITH_PROGRESS]', error);
      throw new HttpException(
        'Error fetching course details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProgress(userId: string, courseId: string): Promise<number> {
    try {
      // Get published chapters for the course
      const publishedChapters = await this.prisma.chapter.findMany({
        where: { courseId, isPublished: true },
        select: { id: true },
      });

      const publishedChapterIds = publishedChapters.map(
        (chapter) => chapter.id,
      );

      // Count the number of completed chapters
      const validCompletedChapters = await this.prisma.userProgress.count({
        where: {
          userId,
          chapterId: { in: publishedChapterIds },
          isCompleted: true,
        },
      });

      const progressPercentage =
        (validCompletedChapters / publishedChapterIds.length) * 100;
      return progressPercentage;
    } catch (error) {
      console.error('[GET_PROGRESS]', error);
      return 0; // Default progress when error occurs
    }
  }
  async updateCourse(courseId: string, userId: string, updateData: any) {
    try {
      return this.prisma.course.update({
        where: {
          id: courseId,
          userId: userId,
        },
        data: updateData,
      });
    } catch (error) {
      console.error('Error in updateCourse:', error);
      throw new HttpException(
        'Failed to update course details.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateCourseImage(courseId: string, userId: string, imageUrl: string) {
    return this.prisma.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        imageUrl: imageUrl,
      },
    });
  }
  async getCourseOwner(courseId: string, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { userId: true },
    });
    return course?.userId === userId;
  }
  async publishChapter(courseId: string, chapterId: string, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!course) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const chapter = await this.prisma.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });

    if (
      !chapter ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        isPublished: true,
      },
    });
  }
  async unpublishChapter(courseId: string, chapterId: string, userId: string) {
    const ownCourse = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownCourse) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // Unpublish the chapter
    const unpublishedChapter = await this.prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        isPublished: false,
      },
    });

    // Check if there are any published chapters remaining in the course
    const publishedChaptersInCourse = await this.prisma.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    });

    // If no published chapters remain, set the course as unpublished
    if (publishedChaptersInCourse.length === 0) {
      await this.prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return unpublishedChapter;
  }

  async publishCourse(courseId: string, userId: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished,
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !hasPublishedChapter
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const publishedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return publishedCourse;
  }
  async unpublishCourse(courseId: string, userId: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const unpublishedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return unpublishedCourse;
  }

  async reorderChapters(
    courseId: string,
    userId: string,
    list: { id: string; position: number }[],
  ) {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!course) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // Update chapters positions
    const updatePromises = list.map((item) =>
      this.prisma.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      }),
    );

    await Promise.all(updatePromises);
  }
}
