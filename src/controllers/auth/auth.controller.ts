import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { LoginFormDto, RegisterFormDto } from '../../dto/auth.form.dto';
import { registerFormDtoToUserEntity } from '../../mappers/auth.mapper';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterFormDto): Promise<void> {
    // transforme le dto en entité
    const data = registerFormDtoToUserEntity(body);

    //appel du service pour enregistrer le user en db
    await this._userService.register(data);
    console.log('user registered');
    //TODO un mail de confirmation
  }

  @Post('login')
  async login(@Body() body: LoginFormDto): Promise<{ token: string }> {
    const user = await this._userService.login(body);
    const token = this._jwtService.sign({
      id: user.id,
      role: user.role,
    });
    return { token };
  }
}