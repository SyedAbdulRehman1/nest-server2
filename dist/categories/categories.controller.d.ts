import { Request } from 'express';
import { CategoryService } from './categories.service';
export declare class CategoryController {
    private readonly CategoryService;
    constructor(CategoryService: CategoryService);
    getCategoriesAndCourses(req: Request, title?: string, categoryId?: string): Promise<{
        categories: {
            id: string;
            name: string;
        }[];
        courses: {
            progress: number;
            category: {
                id: string;
                name: string;
            };
            chapters: {
                id: string;
            }[];
            purchases: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                courseId: string;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            userId: string;
            description: string;
            imageUrl: string;
            price: number;
            isPublished: boolean;
            categoryId: string;
        }[];
    }>;
}
