import { Controller, Post, Body, UnauthorizedException, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { CredentialDTO } from './dto/credential.dto';
import { NestResponse } from '../core/http/nest-response';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  async login(@Body() credentials: CredentialDTO): Promise<NestResponse> {
    try {
      const user_credentials = await this.authService.validateUserCredentials(credentials.email, credentials.password);
      if (!user_credentials) {
        throw new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Credenciais inválidas.'
        });
      };
      const new_token = await this.authService.createToken(user_credentials.id, user_credentials.company_id);
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withNextAuth(new_token)
        .build();
    } catch (error) {
      throw new BadRequestException({
        status_code: HttpStatus.BAD_REQUEST,
        message: [error.message]
      });
    };
  };
}
