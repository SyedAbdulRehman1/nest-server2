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
exports.PurchasesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const purchases_service_1 = require("./purchases.service");
let PurchasesController = class PurchasesController {
    constructor(purchasesService) {
        this.purchasesService = purchasesService;
    }
    async checkPurchase(courseId, req) {
        var _a;
        console.log(req.user, 'dfdf');
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        console.log(userId, 'courseIdcourseIdcourseId');
        if (!courseId) {
            throw new common_1.HttpException('Missing courseId', common_1.HttpStatus.BAD_REQUEST);
        }
        const purchase = await this.purchasesService.checkUserPurchase(courseId, userId);
        console.log(purchase, '939393,nnmmmggg');
        return { purchase: purchase || [] };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('courseId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "checkPurchase", null);
PurchasesController = __decorate([
    (0, common_1.Controller)('purchases'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [purchases_service_1.PurchasesService])
], PurchasesController);
exports.PurchasesController = PurchasesController;
//# sourceMappingURL=purchases.controller.js.map