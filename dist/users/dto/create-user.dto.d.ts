export declare class CreateUserDto {
    email: string;
    password: string;
    userType: 'TEACHER' | 'STUDENT';
    name?: string;
}
