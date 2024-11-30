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
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        isPublished: boolean;
        categoryId: string | null;
    }[]>;
    getProgress(userId: string, courseId: string): Promise<number>;
}
