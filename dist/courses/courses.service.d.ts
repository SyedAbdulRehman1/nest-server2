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
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
    }[]>;
    createCourse(userId: string, createCourseDto: CreateCourseDto): Promise<{
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
    }>;
    getCourseByIdAndUser(courseId: string, userId: string): Promise<{
        chapters: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            isPublished: boolean;
            position: number;
            videoUrl: string;
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
        description: string;
        imageUrl: string;
        price: number;
        isPublished: boolean;
        categoryId: string;
    }>;
    getCourseById(courseId: string, userId: string): Promise<{
        chapters: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            isPublished: boolean;
            position: number;
            videoUrl: string;
            isFree: boolean;
            courseId: string;
        }[];
    } & {
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
    }>;
    getCourseWithProgress(courseId: string, userId: string): Promise<{
        course: {
            chapters: ({
                userProgress: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    chapterId: string;
                    isCompleted: boolean;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string;
                isPublished: boolean;
                position: number;
                videoUrl: string;
                isFree: boolean;
                courseId: string;
            })[];
        } & {
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
        };
        progressCount: number;
    }>;
    getProgress(userId: string, courseId: string): Promise<number>;
    updateCourse(courseId: string, userId: string, updateData: any): Promise<{
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
    }>;
    updateCourseImage(courseId: string, userId: string, imageUrl: string): Promise<{
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
    }>;
    getCourseOwner(courseId: string, userId: string): Promise<boolean>;
    publishChapter(courseId: string, chapterId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        isPublished: boolean;
        position: number;
        videoUrl: string;
        isFree: boolean;
        courseId: string;
    }>;
    unpublishChapter(courseId: string, chapterId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        isPublished: boolean;
        position: number;
        videoUrl: string;
        isFree: boolean;
        courseId: string;
    }>;
    publishCourse(courseId: string, userId: string): Promise<{
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
    }>;
    unpublishCourse(courseId: string, userId: string): Promise<{
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
    }>;
    reorderChapters(courseId: string, userId: string, list: {
        id: string;
        position: number;
    }[]): Promise<void>;
}
