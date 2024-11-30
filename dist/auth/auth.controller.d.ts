import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        status: string;
        user: {
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
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    getUserById(id: string): Promise<{
        data: {
            hasPassword: boolean;
        };
        statusCode: number;
        message?: undefined;
    } | {
        message: string;
        statusCode: number;
        data?: undefined;
    }>;
    activateAccount(token: string): Promise<{
        data: {
            message: string;
            status: string;
        };
        statusCode: number;
        message?: undefined;
        status?: undefined;
    } | {
        message: any;
        status: any;
        statusCode: any;
        data?: undefined;
    }>;
}
