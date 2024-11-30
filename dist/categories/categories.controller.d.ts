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
            progress: number | null;
            category: {
                id: string;
                name: string;
            } | null;
            chapters: {
                id: string;
            }[];
            purchases: {
                id: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
                courseId: string;
            }[];
            id: string;
            title: string;
            categoryId: string | null;
            userId: string;
            description: string | null;
            imageUrl: string | null;
            price: number | null;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
