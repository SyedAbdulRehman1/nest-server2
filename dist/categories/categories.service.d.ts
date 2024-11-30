import { PrismaService } from '../prisma/prisma.service';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCategories(): Promise<{
        id: string;
        name: string;
    }[]>;
    getCourses({ userId, title, categoryId, }: {
        userId: string;
        title?: string;
        categoryId?: string;
    }): Promise<{
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
    }[]>;
    getProgress(userId: string, courseId: string): Promise<number>;
}
