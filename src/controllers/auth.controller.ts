import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { LoginFormDto, RegisterFormDto } from '../dto/auth.form.dto';
import { registerFormDtoToUserEntity } from '../mappers/auth.mapper';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterFormDto): Promise<void> {
    await this.userService.create(registerFormDtoToUserEntity(body));
    console.log('user registered');
  }

  @Post('login')
  async login(@Body() body: LoginFormDto): Promise<{ token: string }> {
    const user = await this.userService.login(body);
    const token = this._jwtService.sign({
      id: user.id,
      role: user.role,
    });
    return { token: token };
  }
}
