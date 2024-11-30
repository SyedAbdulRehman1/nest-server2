import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as crypto from 'crypto';
import sendEmail from 'src/common/sendEmail';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const validateEmail = (email: string) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };
    if (!validateEmail(email)) {
      throw new HttpException(
        `The email address '${email}' is invalid. Please provide a valid email address.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60000, // 30 days in milliseconds
    );
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          userType: 'STUDENT',
          resetToken: token,
          resetTokenExpiry: tokenExpiration,
        },
      });
      const activationLink = `${process.env.BASE_URL}/auth/activate/${token}`;
      sendEmail(email, 'Email confirmation', activationLink);

      // return user;
      return {
        message:
          'User registered successfully! Please check your email to activate your account.',
        status: 'success',
        user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Email already in use',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      throw new Error('Internal server error');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      userId: user.id,
      role: user.role,
      type: user.userType,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async activateAccount(token: string) {
    // Find the user by activation token
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          not: null,
        },
      },
    });

    if (!user || !user.resetTokenExpiry) {
      throw new HttpException(
        {
          message: 'Invalid or expired token',
          status: 'error',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if the token is expired
    const now = new Date();
    if (now > user.resetTokenExpiry) {
      throw new HttpException(
        {
          message: 'Token expired, please request a new one.',
          status: 'error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Update the user to mark as verified
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return {
      message: 'Account activated successfully! You can now log in.',
      status: 'success',
    };
  }
  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return { hasPassword: user.password ? true : false };
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
