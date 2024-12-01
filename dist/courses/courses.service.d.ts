import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCoursesByUser(userId: string): Promise<{
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
    createCourse(userId: string, createCourseDto: CreateCourseDto): Promise<{
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
    }>;
    getCourseByIdAndUser(courseId: string, userId: string): Promise<({
        chapters: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            isPublished: boolean;
            position: number;
            videoUrl: string | null;
            isFree: boolean;
            courseId: string;
        }[];
        attachments: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            courseId: string;
            url: string;
        }[];
    } & {
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
    }) | null>;
    getCourseById(courseId: string, userId: string): Promise<{
        chapters: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            isPublished: boolean;
            position: number;
            videoUrl: string | null;
            isFree: boolean;
            courseId: string;
        }[];
    } & {
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
    }>;
    getCourseWithProgress(courseId: string, userId: string): Promise<{
        course: {
            chapters: ({
                userProgress: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    isCompleted: boolean;
                    chapterId: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string | null;
                isPublished: boolean;
                position: number;
                videoUrl: string | null;
                isFree: boolean;
                courseId: string;
            })[];
        } & {
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
        };
        progressCount: number;
    } | null>;
    getProgress(userId: string, courseId: string): Promise<number>;
    updateCourse(courseId: string, userId: string, updateData: any): Promise<{
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
    }>;
    updateCourseImage(courseId: string, userId: string, imageUrl: string): Promise<{
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
    }>;
    getCourseOwner(courseId: string, userId: string): Promise<boolean>;
    publishChapter(courseId: string, chapterId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        isPublished: boolean;
        position: number;
        videoUrl: string | null;
        isFree: boolean;
        courseId: string;
    }>;
    unpublishChapter(courseId: string, chapterId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        isPublished: boolean;
        position: number;
        videoUrl: string | null;
        isFree: boolean;
        courseId: string;
    }>;
    publishCourse(courseId: string, userId: string): Promise<{
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
    }>;
    unpublishCourse(courseId: string, userId: string): Promise<{
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
    }>;
    reorderChapters(courseId: string, userId: string, list: {
        id: string;
        position: number;
    }[]): Promise<void>;
}
