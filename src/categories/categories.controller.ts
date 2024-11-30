import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
//   import { CoursesService } from './courses.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { CategoryService } from './categories.service';
import { User } from 'src/auth/interface/User';

@Controller('categories-and-courses')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get()
  async getCategoriesAndCourses(
    @Req() req: Request,
    @Query('title') title?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    // const userId = req.user?.id;
    const user = req.user as User;
    const userId = user.id;

    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const categories = await this.CategoryService.getCategories();
      const courses = await this.CategoryService.getCourses({
        userId,
        title,
        categoryId,
      });

      return { categories, courses };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
