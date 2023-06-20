import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { NestResponse } from './nest-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class ResponseTransformationInterceptor implements NestInterceptor {

  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((nestResponse: NestResponse) => {
        if (nestResponse instanceof NestResponse) {
          const switched_context = context.switchToHttp();
          const response = switched_context.getResponse();
          const request = switched_context.getRequest;
          const { headers, status, body } = nestResponse;
          const header_list = Object.getOwnPropertyNames(headers);
          header_list.forEach((header_name) => {
            const header_value = headers[header_name];
            this.httpAdapter.setHeader(response, header_name, header_value);
          });
          this.httpAdapter.status(response, status);
          return body;
        } else {
          return nestResponse;
        }
      })
    );
  }
}
