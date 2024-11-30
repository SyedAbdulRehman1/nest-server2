"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCoursesByUser(userId) {
        try {
            return await this.prisma.course.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });
        }
        catch (error) {
            console.error('Error in getCoursesByUser:', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCourse(userId, createCourseDto) {
        try {
            const { title } = createCourseDto;
            return await this.prisma.course.create({
                data: {
                    userId,
                    title,
                },
            });
        }
        catch (error) {
            console.error('[CREATE COURSE]', error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create course',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCourseByIdAndUser(courseId, userId) {
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
        }
        catch (error) {
            console.error('Error in getCourseByIdAndUser:', error);
            throw new common_1.HttpException('Error fetching course details', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCourseById(courseId, userId) {
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
                throw new common_1.NotFoundException('Course not found');
            }
            return course;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Error fetching course details');
        }
    }
    async getCourseWithProgress(courseId, userId) {
        try {
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
                return null;
            }
            const progressCount = await this.getProgress(userId, courseId);
            return { course, progressCount };
        }
        catch (error) {
            console.error('[GET_COURSE_WITH_PROGRESS]', error);
            throw new common_1.HttpException('Error fetching course details', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getProgress(userId, courseId) {
        try {
            const publishedChapters = await this.prisma.chapter.findMany({
                where: { courseId, isPublished: true },
                select: { id: true },
            });
            const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
            const validCompletedChapters = await this.prisma.userProgress.count({
                where: {
                    userId,
                    chapterId: { in: publishedChapterIds },
                    isCompleted: true,
                },
            });
            const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;
            return progressPercentage;
        }
        catch (error) {
            console.error('[GET_PROGRESS]', error);
            return 0;
        }
    }
    async updateCourse(courseId, userId, updateData) {
        try {
            return this.prisma.course.update({
                where: {
                    id: courseId,
                    userId: userId,
                },
                data: updateData,
            });
        }
        catch (error) {
            console.error('Error in updateCourse:', error);
            throw new common_1.HttpException('Failed to update course details.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateCourseImage(courseId, userId, imageUrl) {
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
    async getCourseOwner(courseId, userId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: { userId: true },
        });
        return (course === null || course === void 0 ? void 0 : course.userId) === userId;
    }
    async publishChapter(courseId, chapterId, userId) {
        const course = await this.prisma.course.findUnique({
            where: {
                id: courseId,
                userId,
            },
        });
        if (!course) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        const chapter = await this.prisma.chapter.findUnique({
            where: {
                id: chapterId,
                courseId,
            },
        });
        if (!chapter ||
            !chapter.title ||
            !chapter.description ||
            !chapter.videoUrl) {
            throw new common_1.HttpException('Missing required fields', common_1.HttpStatus.BAD_REQUEST);
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
    async unpublishChapter(courseId, chapterId, userId) {
        const ownCourse = await this.prisma.course.findFirst({
            where: {
                id: courseId,
                userId,
            },
        });
        if (!ownCourse) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        const unpublishedChapter = await this.prisma.chapter.update({
            where: {
                id: chapterId,
            },
            data: {
                isPublished: false,
            },
        });
        const publishedChaptersInCourse = await this.prisma.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
        });
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
    async publishCourse(courseId, userId) {
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
            throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
        }
        const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);
        if (!course.title ||
            !course.description ||
            !course.imageUrl ||
            !hasPublishedChapter) {
            throw new common_1.HttpException('Missing required fields', common_1.HttpStatus.BAD_REQUEST);
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
    async unpublishCourse(courseId, userId) {
        const course = await this.prisma.course.findFirst({
            where: {
                id: courseId,
                userId,
            },
        });
        if (!course) {
            throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
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
    async reorderChapters(courseId, userId, list) {
        const course = await this.prisma.course.findFirst({
            where: {
                id: courseId,
                userId,
            },
        });
        if (!course) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        const updatePromises = list.map((item) => this.prisma.chapter.update({
            where: { id: item.id },
            data: { position: item.position },
        }));
        await Promise.all(updatePromises);
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map