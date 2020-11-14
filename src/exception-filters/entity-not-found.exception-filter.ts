import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';

export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('exeppp', exception);
    console.log('hehehehehehe');
    if (exception.message == 'Unauthorized') {
      return response
        .status(401)
        .json({
          message: {
            statusCode: 401,
            error: 'Unauthorized',
            message: exception.message,
          },
        });
    }

    if (exception.message == 'User Already Exists') {
      // console.log('excep', exception.stack);
      return response
        .status(400)
        .json({
          message: {
            statusCode: 400,
            error: 'User Already Exists',
            message: exception.message,
          },
        });
    }
    return response
      .status(404)
      .json({
        message: {
          statusCode: 404,
          error: 'Not Found',
          message: 'Entity Not Found',
        },
      });
  }
}