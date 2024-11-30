// src/prisma/initial-setup.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class InitialSetupService {
  constructor(private prisma: PrismaService) {}

  async createTeacher() {
    // Check if there’s already a teacher
    const existingTeacher = await this.prisma.user.findUnique({
      where: { email: 'test@gmail.com' },
    });

    if (!existingTeacher) {
      // Register a teacher if one doesn't exist
      const hashedPassword = await bcrypt.hash('hello123', 10);
      await this.prisma.user.create({
        data: {
          email: 'test@gmail.com', // Use your default teacher email
          password: hashedPassword,
          userType: 'TEACHER',
          role: 'TEACHER',
          emailVerified: true,
        },
      });
      console.log('Teacher registered successfully.');
    }
  }
}
