// src/app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { InitialSetupService } from './prisma/initial-setup.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { CoursesModule } from './courses/courses.module';
import { CoursesService } from './courses/courses.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChapterModule } from './courses/chapters/chapters.module';
import { CategoryModule } from './categories/courses.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ChatModule } from './Chat/ChatModule';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CoursesModule,
    UsersModule,
    ChapterModule,
    CategoryModule,
    ChatModule,
    PurchasesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the `uploads` folder
      serveRoot: '/uploads', // URL prefix to access the uploads (optional)
    }),
  ],
  controllers: [AppController],

  providers: [InitialSetupService, CoursesService, AppService, UsersService],
})
export class AppModule implements OnModuleInit {
  constructor(private initialSetupService: InitialSetupService) {}

  async onModuleInit() {
    // Run initial setup when the application starts
    await this.initialSetupService.createTeacher();
  }
}
