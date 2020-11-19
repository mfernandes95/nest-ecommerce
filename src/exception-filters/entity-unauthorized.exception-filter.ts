import { ExceptionFilter, ArgumentsHost, HttpException, Catch } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log('exxxxxx', exception.getResponse());
    // console.log('REQQQQQQ======', request);
    // console.log('RESSSSS=====', response);

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        body: exception.getResponse(),
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}