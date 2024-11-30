"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(8001);
}
bootstrap();
//# sourceMappingURL=main.js.map