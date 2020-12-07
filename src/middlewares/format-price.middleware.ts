import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class FormatPriceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...', req.body);
    req.body.price = req.body.price.replace(/[^\d]+/g, "") / 100
    next();
  }
}
