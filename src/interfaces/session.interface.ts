import { UserRole } from '../enums/user-role.enum';

export interface SessionInterface {
  id: number;
  role: UserRole;
}
