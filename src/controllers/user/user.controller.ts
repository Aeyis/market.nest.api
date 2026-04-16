import { Controller, Get, Req } from '@nestjs/common';
import { RequireRole } from '../../guards/require-role/require-role.decorator';
import type { RequestSession } from '../../interfaces/session.interface';
import { UserDto } from '../../dto/user.dto';
import { UserService } from '../../services/user/user.service';
import { userEntityToDto } from '../../mappers/user.mapper';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @RequireRole()
  async me(@Req() req: RequestSession): Promise<{ data: UserDto }> {
    const user = await this.userService.getById(req.session?.id);
    return { data: userEntityToDto(user) };
  }
}
