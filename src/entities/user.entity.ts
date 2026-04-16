import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ length: 255 })
  firstname: string;

  @Column({ length: 255 })
  lastname: string;

  @Index('UQ_user_email', { unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.User })
  role: UserRole;
}
