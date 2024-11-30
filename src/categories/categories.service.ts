import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    try {
      return await this.prisma.category.findMany({
        orderBy: { name: 'asc' },
      });
    } catch (error) {
      console.error('[GET_CATEGORIES]', error);
      throw new HttpException(
        'Error fetching categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCourses({
    userId,
    title,
    categoryId,
  }: {
    userId: string;
    title?: string;
    categoryId?: string;
  }) {
    try {
      const courses = await this.prisma.course.findMany({
        where: {
          isPublished: true,
          title: {
            contains: title,
          },
          categoryId,
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
          purchases: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return await Promise.all(
        courses.map(async (course) => {
          const progress =
            course.purchases.length > 0
              ? await this.getProgress(userId, course.id)
              : null;

          return {
            ...course,
            progress,
          };
        }),
      );
    } catch (error) {
      console.error('[GET_COURSES]', error);
      throw new HttpException(
        'Error fetching courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProgress(userId: string, courseId: string): Promise<number> {
    try {
      const publishedChapters = await this.prisma.chapter.findMany({
        where: {
          courseId,
          isPublished: true,
        },
        select: {
          id: true,
        },
      });

      const publishedChapterIds = publishedChapters.map(
        (chapter) => chapter.id,
      );

      const validCompletedChapters = await this.prisma.userProgress.count({
        where: {
          userId,
          chapterId: {
            in: publishedChapterIds,
          },
          isCompleted: true,
        },
      });

      return (validCompletedChapters / publishedChapterIds.length) * 100;
    } catch (error) {
      console.error('[GET_PROGRESS]', error);
      return 0;
    }
  }
}
