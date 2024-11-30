import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    try {
      const result = await this.authService.getUserById(id);
      return { data: result, statusCode: 200 }; // Sending a success response with the user data
    } catch (error) {
      return {
        message: 'Server error',
        statusCode: 500,
      };
    }
  }
  @Get('activate/:token')
  async activateAccount(@Param('token') token: string) {
    try {
      const result = await this.authService.activateAccount(token);
      return { data: result, statusCode: 200 }; // Sending a success response with status code
    } catch (error) {
      return {
        message: error.response.message,
        status: error.response.status,
        statusCode: error.getStatus(),
      };
    }
  }

  // @Get('activate')
  // async activateAccount(@Query('token') token: string) {
  //   const result = await this.authService.activateAccount(token);
  //   if (result) {
  //     return {
  //       message: 'Account successfully activated!',
  //     };
  //   } else {
  //     throw new NotFoundException('Invalid or expired token');
  //   }
  // }
}
