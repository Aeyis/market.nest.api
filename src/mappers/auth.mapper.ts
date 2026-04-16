import { RegisterFormDto } from '../dto/auth.form.dto';
import { UserEntity } from '../entities/user.entity';

export function registerFormDtoToUserEntity(
  dto: RegisterFormDto,
): Omit<UserEntity, 'id' | 'role'> {
  const user = new UserEntity();

  user.username = dto.username;
  user.password = dto.password;
  user.email = dto.email;
  user.firstname = dto.firstname;
  user.lastname = dto.lastname;

  return user;
}
