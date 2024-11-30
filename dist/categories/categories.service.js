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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCategories() {
        try {
            return await this.prisma.category.findMany({
                orderBy: { name: 'asc' },
            });
        }
        catch (error) {
            console.error('[GET_CATEGORIES]', error);
            throw new common_1.HttpException('Error fetching categories', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCourses({ userId, title, categoryId, }) {
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
            return await Promise.all(courses.map(async (course) => {
                const progress = course.purchases.length > 0
                    ? await this.getProgress(userId, course.id)
                    : null;
                return Object.assign(Object.assign({}, course), { progress });
            }));
        }
        catch (error) {
            console.error('[GET_COURSES]', error);
            throw new common_1.HttpException('Error fetching courses', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getProgress(userId, courseId) {
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
            const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
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
        }
        catch (error) {
            console.error('[GET_PROGRESS]', error);
            return 0;
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=categories.service.js.map