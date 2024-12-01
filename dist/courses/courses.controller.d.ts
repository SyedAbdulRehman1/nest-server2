/// <reference types="multer" />
import { CoursesService } from './courses.service';
import { Request } from 'express';
import { CreateCourseDto } from './dto/create-course.dto';
import { ChaptersService } from './chapters/chapters.service';
import { UpdateChapterDto } from './dto/update-chapter.dto';
export declare class CoursesController {
    private coursesService;
    private chaptersService;
    constructor(coursesService: CoursesService, chaptersService: ChaptersService);
    getCourses(req: Request): Promise<{
        courses: {
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
        }[];
    }>;
    createCourse(req: Request, createCourseDto: CreateCourseDto): Promise<{
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
    getCourseDetails(courseId: string, userId: string, req: Request): Promise<{
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
    }>;
    getUniqueCourse(courseId: string, req: Request): Promise<{
        status: string;
        data: {
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
        };
    }>;
    getCourseDetailsWithProgress(courseId: string, req: Request): Promise<{
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
    }>;
    updateCourse(courseId: string, updateData: any, req: Request): Promise<{
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
    uploadFile(courseId: string, file: Express.Multer.File, req: Request): Promise<{
        url: string;
        updatedCourse: {
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
    }>;
    createChapter(courseId: string, body: {
        title: string;
    }, req: Request): Promise<{
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
    updateChapter(courseId: string, chapterId: string, updateChapterDto: UpdateChapterDto, req: Request): Promise<{
        chapter: {
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
        };
        message: string;
    }>;
    publishChapter(courseId: string, chapterId: string, req: Request): Promise<{
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
    unpublishChapter(courseId: string, chapterId: string, req: Request): Promise<{
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
    publishCourse(id: string, req: Request): Promise<{
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
    unpublishCourse(courseId: string, req: Request): Promise<{
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
    reorderChapters(courseId: string, list: {
        id: string;
        position: number;
    }[], req: Request): Promise<{
        message: string;
    }>;
}
