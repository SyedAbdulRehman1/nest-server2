"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const multer_1 = require("multer");
const create_course_dto_1 = require("./dto/create-course.dto");
const jwt_auth_guard_1 = require("src/auth/guards/jwt-auth.guard");
const library_1 = require("@prisma/client/runtime/library");
const multer_2 = require("@nestjs/platform-express/multer");
const path_1 = require("path");
const fs = __importStar(require("fs"));
const chapters_service_1 = require("./chapters/chapters.service");
const update_chapter_dto_1 = require("./dto/update-chapter.dto");
let CoursesController = class CoursesController {
    constructor(coursesService, chaptersService) {
        this.coursesService = coursesService;
        this.chaptersService = chaptersService;
    }
    async getCourses(req) {
        try {
            const user = req.user;
            const userId = user.id;
            if (!userId) {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
            const courses = await this.coursesService.getCoursesByUser(userId);
            return { courses };
        }
        catch (error) {
            console.error('Error fetching courses:', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCourse(req, createCourseDto) {
        try {
            const user = req.user;
            const userId = user.id;
            const isTeacher = (user === null || user === void 0 ? void 0 : user.userType) === 'TEACHER';
            if (!userId || !isTeacher) {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
            const course = await this.coursesService.createCourse(userId, createCourseDto);
            return course;
        }
        catch (error) {
            console.error('[CREATE COURSE]', error);
            if (error instanceof library_1.PrismaClientValidationError) {
                console.error('[CREATE COURSE - Prisma Validation Error]', error);
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Prisma validation error',
                    error: error.message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            console.error('[CREATE COURSE]', error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create course',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCourseDetails(courseId, userId, req) {
        try {
            const user = req.user;
            const userId = user.id;
            if (!userId) {
                throw new common_1.HttpException('Unauthorized User ID is required', common_1.HttpStatus.UNAUTHORIZED);
            }
            const course = await this.coursesService.getCourseByIdAndUser(courseId, userId);
            if (!course) {
                throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
            }
            return course;
        }
        catch (error) {
            console.error('Error fetching course details:', error);
            throw new common_1.HttpException('Failed to fetch course details', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUniqueCourse(courseId, req) {
        const user = req.user;
        const userId = user.id;
        const course = await this.coursesService.getCourseById(courseId, userId);
        return { status: 'success', data: course };
    }
    async getCourseDetailsWithProgress(courseId, req) {
        const user = req.user;
        const userId = user.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        const course = await this.coursesService.getCourseWithProgress(courseId, userId);
        if (!course) {
            throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
        }
        return course;
    }
    async updateCourse(courseId, updateData, req) {
        const user = req.user;
        const userId = user.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const course = await this.coursesService.getCourseByIdAndUser(courseId, userId);
            if (!course) {
                throw new common_1.HttpException('Course not found or unauthorized access.', common_1.HttpStatus.NOT_FOUND);
            }
            const updatedCourse = await this.coursesService.updateCourse(courseId, userId, updateData);
            return updatedCourse;
        }
        catch (error) {
            console.error('Error updating course details:', error);
            throw new common_1.HttpException('Failed to update course details.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async uploadFile(courseId, file, req) {
        const user = req.user;
        const userId = user.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!file) {
            throw new common_1.HttpException('No file uploaded', common_1.HttpStatus.BAD_REQUEST);
        }
        const cleanedFilePath = file.path.replace(/\\/g, '/');
        const fileUrl = `/${cleanedFilePath}`;
        try {
            const updatedCourse = await this.coursesService.updateCourseImage(courseId, userId, fileUrl);
            console.log(fileUrl, 'fileee');
            return {
                url: fileUrl,
                updatedCourse,
            };
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw new common_1.HttpException('Failed to upload file', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createChapter(courseId, body, req) {
        const user = req.user;
        const userId = user.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized User ID is required', common_1.HttpStatus.UNAUTHORIZED);
        }
        const courseOwner = await this.coursesService.getCourseOwner(courseId, userId);
        if (!courseOwner) {
            throw new common_1.UnauthorizedException('You are not authorized to add chapters to this course');
        }
        const newPosition = await this.chaptersService.getNextPosition(courseId);
        const chapter = await this.chaptersService.create({
            title: body.title,
            courseId,
            position: newPosition,
        });
        return chapter;
    }
    async updateChapter(courseId, chapterId, updateChapterDto, req) {
        try {
            const user = req.user;
            const userId = user.id;
            if (!userId) {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
            console.log(updateChapterDto, 'udddd');
            const chapter = await this.chaptersService.updateChapter(courseId, chapterId, updateChapterDto, userId);
            return { chapter, message: 'Chapter updated successfully' };
        }
        catch (error) {
            throw error;
        }
    }
    async publishChapter(courseId, chapterId, req) {
        console.log(req, 'ererer');
        const user = req.user;
        const userId = user.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.coursesService.publishChapter(courseId, chapterId, userId);
    }
    async unpublishChapter(courseId, chapterId, req) {
        const user = req.user;
        const userId = user.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            return await this.coursesService.unpublishChapter(courseId, chapterId, userId);
        }
        catch (error) {
            console.error('[CHAPTER_UNPUBLISH]', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async publishCourse(id, req) {
        const user = req.user;
        const userId = user.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            return await this.coursesService.publishCourse(id, userId);
        }
        catch (error) {
            console.error('[COURSE_ID_PUBLISH]', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async unpublishCourse(courseId, req) {
        const user = req.user;
        const userId = user.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            return await this.coursesService.unpublishCourse(courseId, userId);
        }
        catch (error) {
            console.error('[COURSE_ID_UNPUBLISH]', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reorderChapters(courseId, list, req) {
        const user = req.user;
        const userId = user.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            await this.coursesService.reorderChapters(courseId, userId, list);
            return { message: 'Chapters reordered successfully' };
        }
        catch (error) {
            console.error('[REORDER]', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)(':courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Query)('userId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourseDetails", null);
__decorate([
    (0, common_1.Get)('courseUnique/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getUniqueCourse", null);
__decorate([
    (0, common_1.Get)('course-with-progress/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "getCourseDetailsWithProgress", null);
__decorate([
    (0, common_1.Patch)(':courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Post)(':courseId/upload'),
    (0, common_1.UseInterceptors)((0, multer_2.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const courseId = req.params.courseId;
                let uploadPath = '';
                if (file.mimetype.startsWith('image/')) {
                    uploadPath = `./uploads/images/courses/${courseId}`;
                }
                else if (file.mimetype.startsWith('video/')) {
                    uploadPath = `./uploads/videos/courses/${courseId}`;
                }
                else if (file.mimetype.startsWith('application/')) {
                    uploadPath = `./uploads/docs/courses/${courseId}`;
                }
                else {
                    cb(new Error('Unsupported file type'), '');
                    return;
                }
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `file-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)(':courseId/chapters'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createChapter", null);
__decorate([
    (0, common_1.Patch)(':courseId/chapters/:chapterId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('chapterId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_chapter_dto_1.UpdateChapterDto, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "updateChapter", null);
__decorate([
    (0, common_1.Patch)(':courseId/chapters/:chapterId/publish'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('chapterId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "publishChapter", null);
__decorate([
    (0, common_1.Patch)(':courseId/chapters/:chapterId/unpublish'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Param)('chapterId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "unpublishChapter", null);
__decorate([
    (0, common_1.Patch)(':id/publish'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "publishCourse", null);
__decorate([
    (0, common_1.Patch)(':id/unpublish'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "unpublishCourse", null);
__decorate([
    (0, common_1.Put)(':id/chapters/reorder'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('list')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "reorderChapters", null);
CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)(courses_service_1.CoursesService)),
    __param(1, (0, common_1.Inject)(chapters_service_1.ChaptersService)),
    __metadata("design:paramtypes", [courses_service_1.CoursesService,
        chapters_service_1.ChaptersService])
], CoursesController);
exports.CoursesController = CoursesController;
//# sourceMappingURL=courses.controller.js.map