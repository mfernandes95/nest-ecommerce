import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';

export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('exeppp', exception);

    // if (Node.env == production) {
    //   return response
    //     .status(404)
    //     .json({
    //       message: {
    //         statusCode: 404,
    //         error: 'Not Found',
    //         message: 'Entity Not Found',
    //       },
    //     });
    // }

    return response
      .status(404)
      .json({
        message: {
          statusCode: 404,
          error: 'Not Found',
          message: exception.message,
        },
      });
  }
}