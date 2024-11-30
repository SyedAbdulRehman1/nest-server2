import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    findOne(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
}
