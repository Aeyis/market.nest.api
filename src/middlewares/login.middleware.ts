import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request:');
    console.log(`Method: ${req.method.toUpperCase()} `);
    console.log(`URL: ${req.baseUrl}`);

    next();
  }
}
