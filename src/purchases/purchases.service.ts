import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a Prisma service to interact with the database

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserPurchase(courseId: string, userId: string) {
    try {
      console.log(courseId, userId, '93838383kk');
      const purchase = await this.prisma.purchase.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });
      console.log(purchase, '393939');
      return purchase;
    } catch (error) {
      console.error('Error checking purchase:', error);
      throw new Error('Error checking purchase');
    }
  }
}
