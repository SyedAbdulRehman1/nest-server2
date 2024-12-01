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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("../../prisma/prisma.service");
const chapters_service_1 = require("./chapters.service");
const update_chapter_dto_1 = require("./dto/update-chapter.dto");
let ChapterController = class ChapterController {
    constructor(prisma, chaptersService) {
        this.prisma = prisma;
        this.chaptersService = chaptersService;
    }
    async getChapter(courseId, chapterId) {
        return this.chaptersService.getChapterWithCompletion(courseId, chapterId);
    }
    async getChapterData(courseId, chapterId, req) {
        const user = req.user;
        const userId = user.id;
        try {
            return await this.chaptersService.getChapterData(userId, courseId, chapterId);
        }
        catch (error) {
            throw error;
        }
    }
    async updateChapter(courseId, chapterId, updateChapterDto, req) {
        try {
            console.log(req, 'reee');
        }
        catch (error) {
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Get)(':courseId/chapters/:chapterId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('chapterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getChapter", null);
__decorate([
    (0, common_1.Get)('get-chapter'),
    __param(0, (0, common_1.Query)('courseId')),
    __param(1, (0, common_1.Query)('chapterId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getChapterData", null);
__decorate([
    (0, common_1.Patch)(':courseId/chapters/:chapterId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('chapterId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_chapter_dto_1.UpdateChapterDto, Object]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "updateChapter", null);
ChapterController = __decorate([
    (0, common_1.Controller)('chapters'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        chapters_service_1.ChaptersService])
], ChapterController);
exports.ChapterController = ChapterController;
//# sourceMappingURL=chapters.controller.js.map