import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCoursesByUser(userId: string): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        isPublished: boolean;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createCourse(userId: string, createCourseDto: CreateCourseDto): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        isPublished: boolean;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCourseByIdAndUser(courseId: string, userId: string): Promise<({
        chapters: {
            id: string;
            title: string;
            description: string | null;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
            position: number;
            videoUrl: string | null;
            isFree: boolean;
            courseId: string;
        }[];
        attachments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            courseId: string;
            url: string;
        }[];
    } & {
        id: string;
        userId: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        isPublished: boolean;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getCourseById(courseId: string, userId: string): Promise<{
        chapters: {
            id: string;
            title: string;
            description: string | null;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
            position: number;
            videoUrl: string | null;
            isFree: boolean;
            courseId: string;
        }[];
    } & {
        id: string;
        userId: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        isPublished: boolean;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCourseWithProgress(courseId: string, userId: string): Promise<{
        course: {
            chapters: ({
                userProgress: {
                    id: string;
                    userId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    isCompleted: boolean;
                    chapterId: string;
                }[];
            } & {
                id: string;
                title: string;
                description: string | null;
                isPublished: boolean;
                createdAt: Date;
                updatedAt: Date;
                position: number;
                videoUrl: string | null;
                isFree: boolean;
                courseId: string;
            })[];
        } & {
            id: string;
            userId: string;
            title: string;
            description: string | null;
            imageUrl: string | null;
            price: number | null;
            isPublished: boolean;
            categoryId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        progressCount: number;
    } | null>;
    getProgress(userId: string, courseId: string): Promise<number>;
    updateCourse(courseId: string, userId: string, updateData: any): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        isPublished: boolean;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCourseImage(courseId: string, userId: string, imageUrl: string): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        isPublished: boolean;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCourseOwner(courseId: string, userId: string): Promise<boolean>;
    publishChapter(courseId: string, chapterId: string, userId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        videoUrl: string | null;
        isFree: boolean;
        courseId: string;
    }>;
    unpublishChapter(courseId: string, chapterId: string, userId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        position: number;
        videoUrl: string | null;
        isFree: boolean;
        courseId: string;
    }>;
    publishCourse(courseId: string, userId: string): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        isPublished: boolean;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    unpublishCourse(courseId: string, userId: string): Promise<{
        id: string;
        userId: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        price: number | null;
        isPublished: boolean;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    reorderChapters(courseId: string, userId: string, list: {
        id: string;
        position: number;
    }[]): Promise<void>;
}
