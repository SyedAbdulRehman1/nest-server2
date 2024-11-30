import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { MuxService } from './mux.service';
export declare class ChaptersService {
    private readonly prisma;
    private readonly muxService;
    constructor(prisma: PrismaService, muxService: MuxService);
    getNextPosition(courseId: string): Promise<number>;
    create(data: {
        title: string;
        courseId: string;
        position: number;
    }): Promise<{
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
    getChapterWithCompletion(courseId: string, chapterId: string): Promise<{
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
    updateChapter(courseId: string, chapterId: string, updateChapterDto: UpdateChapterDto, userId: string): Promise<{
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
    getChapterData(userId: string, courseId: string, chapterId: string): Promise<{
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
    private getSessionFromRequest;
}
