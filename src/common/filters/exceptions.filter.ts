import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost, AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  catch(exception: Error, host: ArgumentsHost) {
    let exception_response: any;
    const switched_context = host.switchToHttp();
    const request = switched_context.getRequest();
    const response = switched_context.getResponse();
    if (exception instanceof HttpException) {
      let excp_get_response = JSON.stringify(exception.getResponse());
      let excp_message = JSON.parse(excp_get_response).message;
      exception_response = {
        status: exception.getStatus(),
        body: {
          status_code: exception.getStatus(),
          message: excp_message
        }
      }
    } else {
      exception_response = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: {
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: new Date().toISOString(),
          path: request.path
        }
      }
    }
    this.httpAdapter.reply(response, exception_response.body, exception_response.status);
  }

}
