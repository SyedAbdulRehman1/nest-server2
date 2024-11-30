import { Request } from 'express';
import { PurchasesService } from './purchases.service';
export declare class PurchasesController {
    private readonly purchasesService;
    constructor(purchasesService: PurchasesService);
    checkPurchase(courseId: string, req: Request): Promise<{
        purchase: any[] | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            courseId: string;
        };
    }>;
}
