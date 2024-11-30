// src/users/users.controller.ts
import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto); // Assume you will implement login method in AuthService
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get('profile')
  getProfile(@Body() user: any) {
    return this.usersService.findOne(user.id);
  }
}
