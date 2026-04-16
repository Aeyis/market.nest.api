import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterFormDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  firstname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(2)
  password: string;
}

export class LoginFormDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  username: string;

  @IsString()
  password: string;
}
