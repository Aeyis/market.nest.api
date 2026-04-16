import { UserRole } from '../enums/user-role.enum';
import { Request } from 'express';

export interface SessionInterface {
  id: number;
  role: UserRole;
}

export type RequestSession = Request & { session: SessionInterface };
