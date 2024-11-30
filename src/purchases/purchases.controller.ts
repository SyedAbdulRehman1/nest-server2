import {
  Controller,
  Get,
  Query,
  Req,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PurchasesService } from './purchases.service';
import { User } from 'src/auth/interface/User';

@Controller('purchases')
@UseGuards(JwtAuthGuard)
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}
  @Get()
  async checkPurchase(
    @Query('courseId') courseId: string,
    @Req() req: Request,
  ) {
    console.log(req.user, 'dfdf');
    // const userId = req.user?.id;
    const user = req.user as User;
    const userId = user.id;

    if (!userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED); // Return 401 if user not authenticated
    }
    console.log(userId, 'courseIdcourseIdcourseId');
    if (!courseId) {
      throw new HttpException('Missing courseId', HttpStatus.BAD_REQUEST); // Return 400 if courseId is missing
    }

    // Call the service method to check for purchase
    const purchase = await this.purchasesService.checkUserPurchase(
      courseId,
      userId,
    );
    console.log(purchase, '939393,nnmmmggg');
    // if (!purchase) {
    //   throw new HttpException('Purchase not found', HttpStatus.NOT_FOUND); // Return 404 if no purchase is found
    // }

    return { purchase: purchase || [] };
  }
}
