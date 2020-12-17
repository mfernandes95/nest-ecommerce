import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject('winston')
    private logger: Logger
  ) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    if (process.env.NODE_ENV === 'production') {
      // Request
      this.logRequest(context.switchToHttp().getRequest());

      // Response
      return next.handle().pipe(tap((response) => {
        this.logResponse(context.switchToHttp().getRequest(), JSON.stringify(response))
      }));
    }
    return next.handle();
  }

  private logResponse(request, response) {

    const user = (request as any).user;
    const userEmail = user ? user.email : null;

    this.logger.info({
      timestamp: new Date().toISOString(),
      method: request.method,
      route: request.url,
      responseData: {
        body: response,
      },
      from: request.ip,
      madeBy: userEmail,
    });
  }

  private logRequest(request) {

    const { body } = request;
    delete body.password;
    delete body.confirmed_password;
    const user = (request as any).user;
    const userEmail = user ? user.email : null;

    this.logger.info({
      timestamp: new Date().toISOString(),
      method: request.method,
      route: request.route.path,
      requestData: {
        body: body,
        query: request.query,
        params: request.params,
      },
      from: request.ip,
      madeBy: userEmail,
    });
  }
}