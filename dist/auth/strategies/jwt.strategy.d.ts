import { Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validate(payload: any): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string | null;
        refreshToken: string | null;
        userType: import(".prisma/client").$Enums.UserType;
        emailVerified: boolean | null;
        image: string | null;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
        role: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
export {};
