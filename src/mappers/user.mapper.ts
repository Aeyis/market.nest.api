import { UserEntity } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

export function userEntityToDto(entity: UserEntity): UserDto {
  const dto = new UserDto();
  dto.id = entity.id;
  dto.username = entity.username;
  dto.email = entity.email;
  dto.firstname = entity.firstname;
  dto.lastname = entity.lastname;
  dto.role = entity.role;
  return dto;
}
