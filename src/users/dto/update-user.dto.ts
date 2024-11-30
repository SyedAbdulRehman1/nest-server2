// src/users/dto/update-user.dto.ts
export class UpdateUserDto {
  email?: string;
  password?: string;
  userType?: 'TEACHER' | 'STUDENT';
  name?: string;
}
