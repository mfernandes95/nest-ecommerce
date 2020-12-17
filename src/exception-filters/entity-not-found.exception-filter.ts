import { ExceptionFilter, ArgumentsHost, Inject } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Response } from 'express';
import { Logger } from 'winston';


export class EntityNotFoundExceptionFilter implements ExceptionFilter {

  constructor(
    @Inject('winston')
    private logger: Logger
  ) { }

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // if (process.env.NODE_ENV === 'production') {

    //   this.logger.info({
    //     timestamp: new Date().toISOString(),
    //     data: exception.message,
    //   })

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