import { PrismaService } from '../prisma/prisma.service';
export declare class PurchasesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkUserPurchase(courseId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        courseId: string;
    }>;
}
