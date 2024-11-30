// import { User } from 'src/user/entities/user.entity'; // Adjust the path to your User entity or DTO.
import { User } from '@prisma/client';
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
