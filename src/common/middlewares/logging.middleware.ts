import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('req-res time');
    console.log('hi from mw');

    res.on('finish', () => console.timeEnd('req-res time'));
    next();
  }
}
