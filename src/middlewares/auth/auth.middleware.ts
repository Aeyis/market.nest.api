import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SessionInterface } from '../../interfaces/session.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _jwtService: JwtService) {}

  use(
    req: Request & { session: SessionInterface },
    res: Response,
    next: NextFunction,
  ) {
    // aller chercher le bearer
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      // l'ytilisateur n'est pas connecté
      return next();
    }
    // Extraire le type et le token
    const [type, token] = bearerToken.split(' ');
    // vérifier que le type est "bearertoken"
    if (type.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Invalid type');
    }
    //vérifier le token
    try {
      const session = this._jwtService.verify<SessionInterface>(token);
      req.session = session;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    next();
  }
}
