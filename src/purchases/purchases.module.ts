import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';

@Module({
  imports: [JwtModule],
  controllers: [PurchasesController],
  providers: [PurchasesService, PrismaService, AuthService],
})
export class PurchasesModule {}
