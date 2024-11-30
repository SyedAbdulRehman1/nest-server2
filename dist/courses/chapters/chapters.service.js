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
exports.ChaptersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("src/prisma/prisma.service");
const mux_service_1 = require("./mux.service");
let ChaptersService = class ChaptersService {
    constructor(prisma, muxService) {
        this.prisma = prisma;
        this.muxService = muxService;
    }
    async getNextPosition(courseId) {
        const lastChapter = await this.prisma.chapter.findFirst({
            where: { courseId },
            orderBy: { position: 'desc' },
        });
        return lastChapter ? lastChapter.position + 1 : 1;
    }
    async create(data) {
        return this.prisma.chapter.create({
            data,
        });
    }
    async getChapterWithCompletion(courseId, chapterId) {
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
    async updateChapter(courseId, chapterId, updateChapterDto, userId) {
        const ownCourse = await this.prisma.course.findUnique({
            where: { id: courseId, userId },
        });
        if (!ownCourse) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
        const chapter = await this.prisma.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId,
            },
            data: updateChapterDto,
        });
        if (updateChapterDto.videoUrl) {
            await this.muxService.uploadVideoToMux(updateChapterDto.videoUrl, chapterId);
        }
        return chapter;
    }
    async getChapterData(userId, courseId, chapterId) {
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
                throw new common_1.NotFoundException('Chapter or course not found');
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
        }
        catch (error) {
            console.error('[GET_CHAPTER]', error);
            throw new common_1.InternalServerErrorException('Internal Server Error In Chapter Service');
        }
    }
    async getSessionFromRequest() {
        return { user: { id: 'user-id-from-session' } };
    }
};
ChaptersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mux_service_1.MuxService])
], ChaptersService);
exports.ChaptersService = ChaptersService;
//# sourceMappingURL=chapters.service.js.map