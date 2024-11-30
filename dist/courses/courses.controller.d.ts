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
            userId: string;
            title: string;
            description: string | null;
            imageUrl: string | null;
            price: number | null;
            isPublished: boolean;
            categoryId: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    createCourse(req: Request, createCourseDto: CreateCourseDto): Promise<{
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
    getCourseDetails(courseId: string, userId: string, req: Request): Promise<{
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
    }>;
    getUniqueCourse(courseId: string, req: Request): Promise<{
        status: string;
        data: {
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
        };
    }>;
    getCourseDetailsWithProgress(courseId: string, req: Request): Promise<{
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
    }>;
    updateCourse(courseId: string, updateData: any, req: Request): Promise<{
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
    uploadFile(courseId: string, file: Express.Multer.File, req: Request): Promise<{
        url: string;
        updatedCourse: {
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
    }>;
    createChapter(courseId: string, body: {
        title: string;
    }, req: Request): Promise<{
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
    updateChapter(courseId: string, chapterId: string, updateChapterDto: UpdateChapterDto, req: Request): Promise<{
        chapter: {
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
        };
        message: string;
    }>;
    publishChapter(courseId: string, chapterId: string, req: Request): Promise<{
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
    unpublishChapter(courseId: string, chapterId: string, req: Request): Promise<{
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
    publishCourse(id: string, req: Request): Promise<{
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
    unpublishCourse(courseId: string, req: Request): Promise<{
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
    reorderChapters(courseId: string, list: {
        id: string;
        position: number;
    }[], req: Request): Promise<{
        message: string;
    }>;
}
