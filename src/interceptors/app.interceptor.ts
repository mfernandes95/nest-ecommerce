import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { format } from 'util';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  private readonly logger = new Logger(); // Instantiated Logger

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now(); // Request start time

    return next.handle().pipe(tap((response) => {
      // After calling handle(), the RxJs response object is obtained, and the return value of the routing function can be obtained by tap.
      const host = context.switchToHttp();
      const request = host.getRequest<Request>();
      console.log('resppp', JSON.stringify(response));

      // Print request method, request link, processing time and response data
      this.logger.log(format(
        '%s %s %dms %s',
        request.method,
        request.url,
        Date.now() - start,
        JSON.stringify(response),
      ));
    }));
  }
}