import { NestResponse } from './nest-response';
import { JwtService } from '@nestjs/jwt'; 

export class NestResponseBuilder {

  private response: NestResponse = {
    status: 200,
    headers: {},
    body: {}
  }

  public withStatus(status: number) {
    this.response.status = status;
    return this;
  }

  public withHeaders(headers: Object) {
    this.response.headers = headers;
    return this;
  }

  public withNextAuth(token: string) {
    this.response.headers['Access-Control-Expose-Headers'] = '*,X-Next-Auth';
    this.response.headers['x-next-auth'] = token;
    return this;
  }

  public withBody(body: Object) {
    this.response.body = body;
    return this;
  }

  public build() {
    return new NestResponse(this.response);
  }

}
