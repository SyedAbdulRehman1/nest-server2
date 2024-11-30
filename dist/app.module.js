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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const initial_setup_service_1 = require("./prisma/initial-setup.service");
const auth_module_1 = require("./auth/auth.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const users_service_1 = require("./users/users.service");
const courses_module_1 = require("./courses/courses.module");
const courses_service_1 = require("./courses/courses.service");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const chapters_module_1 = require("./courses/chapters/chapters.module");
const courses_module_2 = require("./categories/courses.module");
const purchases_module_1 = require("./purchases/purchases.module");
const ChatModule_1 = require("./Chat/ChatModule");
let AppModule = class AppModule {
    constructor(initialSetupService) {
        this.initialSetupService = initialSetupService;
    }
    async onModuleInit() {
        await this.initialSetupService.createTeacher();
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            courses_module_1.CoursesModule,
            users_module_1.UsersModule,
            chapters_module_1.ChapterModule,
            courses_module_2.CategoryModule,
            ChatModule_1.ChatModule,
            purchases_module_1.PurchasesModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [initial_setup_service_1.InitialSetupService, courses_service_1.CoursesService, app_service_1.AppService, users_service_1.UsersService],
    }),
    __metadata("design:paramtypes", [initial_setup_service_1.InitialSetupService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map