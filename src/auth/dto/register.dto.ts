import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
