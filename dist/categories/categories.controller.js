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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const categories_service_1 = require("./categories.service");
let CategoryController = class CategoryController {
    constructor(CategoryService) {
        this.CategoryService = CategoryService;
    }
    async getCategoriesAndCourses(req, title, categoryId) {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const categories = await this.CategoryService.getCategories();
            const courses = await this.CategoryService.getCourses({
                userId,
                title,
                categoryId,
            });
            return { categories, courses };
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('title')),
    __param(2, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoriesAndCourses", null);
CategoryController = __decorate([
    (0, common_1.Controller)('categories-and-courses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [categories_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=categories.controller.js.map