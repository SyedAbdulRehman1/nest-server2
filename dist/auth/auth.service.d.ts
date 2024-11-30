import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        status: string;
        user: {
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
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    activateAccount(token: string): Promise<{
        message: string;
        status: string;
    }>;
    getUserById(id: string): Promise<{
        hasPassword: boolean;
    }>;
}
