import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validate(payload: any): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string;
        userType: import(".prisma/client").$Enums.UserType;
        emailVerified: boolean;
        image: string;
        resetToken: string;
        resetTokenExpiry: Date;
        role: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
