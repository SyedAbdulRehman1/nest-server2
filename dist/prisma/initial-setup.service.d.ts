import { PrismaService } from 'src/prisma/prisma.service';
export declare class InitialSetupService {
    private prisma;
    constructor(prisma: PrismaService);
    createTeacher(): Promise<void>;
}
