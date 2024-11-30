import { OnModuleInit } from '@nestjs/common';
import { InitialSetupService } from './prisma/initial-setup.service';
export declare class AppModule implements OnModuleInit {
    private initialSetupService;
    constructor(initialSetupService: InitialSetupService);
    onModuleInit(): Promise<void>;
}
