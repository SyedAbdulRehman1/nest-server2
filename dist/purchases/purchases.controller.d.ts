import { Request } from 'express';
import { PurchasesService } from './purchases.service';
export declare class PurchasesController {
    private readonly purchasesService;
    constructor(purchasesService: PurchasesService);
    checkPurchase(courseId: string, req: Request): Promise<{
        purchase: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            courseId: string;
        } | never[];
    }>;
}
