import { Controller, Post, Body, UnauthorizedException, HttpStatus, BadRequestException, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { CredentialDTO } from './dto/credential.dto';
import { NestResponse } from '../core/http/nest-response';
import { EmailResetPasswordDTO, ResetPasswordDTO } from './dto/reset-password.dto';
import { AuthResetToken } from '../core/guards/auth-reset-pass.guard';
import { AuthPassRequestor } from '../core/decorators/auth.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  async login(@Body() credentials: CredentialDTO): Promise<NestResponse> {
    try {
      const user_credentials = await this.authService.validLoginCredentials(credentials.email, credentials.password);
      if (!user_credentials) {
        throw new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Credenciais inválidas.'
        });
      };

      const new_token = await this.authService.createToken(user_credentials);
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

  @Post('/resetpassword')
  async createResetPassToken(@Body() email_password: EmailResetPasswordDTO): Promise<NestResponse> {
    try {
      await this.authService.createResetPassToken(email_password.email);
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .build();
    } catch (error) {
      throw new BadRequestException({
        status_code: HttpStatus.BAD_REQUEST,
        message: [error.message]
      });
    };
  };

  @Put('/resetpassword')
  @UseGuards(AuthResetToken)
  async resetPassword(@AuthPassRequestor() auth: any, @Body() pass: ResetPasswordDTO): Promise<NestResponse> {
    try {
      await this.authService.resetPass(pass.password, auth);
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .build();
    } catch (error) {
      throw new BadRequestException({
        status_code: HttpStatus.BAD_REQUEST,
        message: [error.message]
      });
    };
  };
};
