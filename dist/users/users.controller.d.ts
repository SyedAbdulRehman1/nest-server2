import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    getUsers(): Promise<User[]>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        status: string;
        user: {
            email: string;
            password: string | null;
            id: string;
            name: string | null;
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
    login(loginDto: any): Promise<{
        accessToken: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string | null;
        id: string;
        name: string | null;
        refreshToken: string | null;
        userType: import(".prisma/client").$Enums.UserType;
        emailVerified: boolean | null;
        image: string | null;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
        role: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(user: any): Promise<{
        email: string;
        password: string | null;
        id: string;
        name: string | null;
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
