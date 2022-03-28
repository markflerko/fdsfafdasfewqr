import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); //gives us controll over inflights req or res objects
    const res = ctx.getResponse<Response>(); //return platform underlying response

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof res === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    res.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
