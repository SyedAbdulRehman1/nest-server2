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
            title: string;
            description: string;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            imageUrl: string;
            price: number;
            categoryId: string;
        }[];
    }>;
    createCourse(req: Request, createCourseDto: CreateCourseDto): Promise<{
        id: string;
        title: string;
        description: string;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        imageUrl: string;
        price: number;
        categoryId: string;
    }>;
    getCourseDetails(courseId: string, userId: string, req: Request): Promise<{
        chapters: {
            id: string;
            title: string;
            description: string;
            videoUrl: string;
            position: number;
            isPublished: boolean;
            isFree: boolean;
            courseId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        attachments: {
            id: string;
            courseId: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            url: string;
        }[];
    } & {
        id: string;
        title: string;
        description: string;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        imageUrl: string;
        price: number;
        categoryId: string;
    }>;
    getUniqueCourse(courseId: string, req: Request): Promise<{
        status: string;
        data: {
            chapters: {
                id: string;
                title: string;
                description: string;
                videoUrl: string;
                position: number;
                isPublished: boolean;
                isFree: boolean;
                courseId: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: string;
            title: string;
            description: string;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            imageUrl: string;
            price: number;
            categoryId: string;
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
                    chapterId: string;
                    isCompleted: boolean;
                }[];
            } & {
                id: string;
                title: string;
                description: string;
                videoUrl: string;
                position: number;
                isPublished: boolean;
                isFree: boolean;
                courseId: string;
                createdAt: Date;
                updatedAt: Date;
            })[];
        } & {
            id: string;
            title: string;
            description: string;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            imageUrl: string;
            price: number;
            categoryId: string;
        };
        progressCount: number;
    }>;
    updateCourse(courseId: string, updateData: any, req: Request): Promise<{
        id: string;
        title: string;
        description: string;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        imageUrl: string;
        price: number;
        categoryId: string;
    }>;
    uploadFile(courseId: string, file: Express.Multer.File, req: Request): Promise<{
        url: string;
        updatedCourse: {
            id: string;
            title: string;
            description: string;
            isPublished: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            imageUrl: string;
            price: number;
            categoryId: string;
        };
    }>;
    createChapter(courseId: string, body: {
        title: string;
    }, req: Request): Promise<{
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        position: number;
        isPublished: boolean;
        isFree: boolean;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateChapter(courseId: string, chapterId: string, updateChapterDto: UpdateChapterDto, req: Request): Promise<{
        chapter: {
            id: string;
            title: string;
            description: string;
            videoUrl: string;
            position: number;
            isPublished: boolean;
            isFree: boolean;
            courseId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        message: string;
    }>;
    publishChapter(courseId: string, chapterId: string, req: Request): Promise<{
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        position: number;
        isPublished: boolean;
        isFree: boolean;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    unpublishChapter(courseId: string, chapterId: string, req: Request): Promise<{
        id: string;
        title: string;
        description: string;
        videoUrl: string;
        position: number;
        isPublished: boolean;
        isFree: boolean;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    publishCourse(id: string, req: Request): Promise<{
        id: string;
        title: string;
        description: string;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        imageUrl: string;
        price: number;
        categoryId: string;
    }>;
    unpublishCourse(courseId: string, req: Request): Promise<{
        id: string;
        title: string;
        description: string;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        imageUrl: string;
        price: number;
        categoryId: string;
    }>;
    reorderChapters(courseId: string, list: {
        id: string;
        position: number;
    }[], req: Request): Promise<{
        message: string;
    }>;
}
