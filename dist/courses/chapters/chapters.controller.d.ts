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
                id: string;
                assetId: string;
                playbackId: string | null;
                chapterId: string;
            } | null;
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
        };
        isComplete: boolean;
        completionText: string;
    }>;
    getChapterData(courseId: string, chapterId: string, req: Request): Promise<{
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
        course: {
            price: number | null;
        };
        muxData: {
            id: string;
            assetId: string;
            playbackId: string | null;
            chapterId: string;
        } | null;
        attachments: any;
        nextChapter: {
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
        } | null;
        userProgress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            isCompleted: boolean;
            chapterId: string;
        } | null;
        purchase: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            courseId: string;
        } | null;
    }>;
    updateChapter(courseId: string, chapterId: string, updateChapterDto: UpdateChapterDto, req: Request): Promise<void>;
}
