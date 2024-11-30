import { PrismaService } from 'src/prisma/prisma.service';
import { ChaptersService } from './chapters.service';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Request } from 'express';
export declare class ChapterController {
    private readonly prisma;
    private readonly chaptersService;
    constructor(prisma: PrismaService, chaptersService: ChaptersService);
    getChapter(courseId: string, chapterId: string): Promise<{
        chapter: {
            muxData: {
                chapterId: string;
                id: string;
                assetId: string;
                playbackId: string;
            };
        } & {
            courseId: string;
            id: string;
            title: string;
            description: string;
            videoUrl: string;
            position: number;
            isPublished: boolean;
            isFree: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        isComplete: boolean;
        completionText: string;
    }>;
    getChapterData(courseId: string, chapterId: string, req: Request): Promise<{
        chapter: {
            courseId: string;
            id: string;
            title: string;
            description: string;
            videoUrl: string;
            position: number;
            isPublished: boolean;
            isFree: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        course: {
            price: number;
        };
        muxData: any;
        attachments: any[];
        nextChapter: any;
        userProgress: {
            chapterId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            isCompleted: boolean;
        };
        purchase: {
            courseId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        };
    }>;
    updateChapter(courseId: string, chapterId: string, updateChapterDto: UpdateChapterDto, req: Request): Promise<void>;
}
