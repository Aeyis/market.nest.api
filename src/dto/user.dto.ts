import { UserRole } from '../enums/user-role.enum';

export class UserDto {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRole;
}
