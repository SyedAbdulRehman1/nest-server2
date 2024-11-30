// src/users/dto/create-user.dto.ts
export class CreateUserDto {
  email: string;
  password: string;
  userType: 'TEACHER' | 'STUDENT'; // For role-based access
  name?: string;
}
