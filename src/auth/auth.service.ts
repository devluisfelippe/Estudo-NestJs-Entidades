import { Inject, Injectable, NotFoundException, ParseUUIDPipe, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken'
import { sendResetPassEmail } from '../utils/send-email';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
  ) { };

  async createToken(user): Promise<any> {
    try {
      const payload = { user: user };
      const new_token = this.jwtService.sign(payload, { secret: process.env.SECRET_APP_TOKEN, expiresIn: `${process.env.SECRET_APP_TOKEN_EXPIRATION}s` });
      return new_token;
    } catch (error) {
      throw new Error(error.message);
    };
  };

  async createPassToken(user_id: string, company_id: string): Promise<any> {
    try {
      const payload = { user_id: user_id, company_id: company_id };
      const pass_token = this.jwtService.sign(payload, { secret: process.env.SECRET_CREATE_PASS_TOKEN, expiresIn: `${process.env.SECRET_CREATE_PASS_EXPIRATION_TOKEN}s` });
      return pass_token;
    } catch (error) {
      throw new Error(error.message);
    };
  };

  async createResetPassToken(email): Promise<any> {
    try {
      const user = await this.usersService.userExists(email);
      if(!user){
        throw new Error('Usuário não encontrado.');
      };

      const payload = { user_id: user.id, company_id: user.company_id };
      const reset_pass_token = this.jwtService.sign(payload, { secret: process.env.SECRET_RESET_PASS_TOKEN, expiresIn: `${process.env.SECRET_RESET_PASS_EXPIRATION_TOKEN}s` });
      
      await sendResetPassEmail(user, reset_pass_token);
      
      return reset_pass_token;
    } catch (error) {
      throw new Error(error.message);
    };
  };

  async resetPass(password, auth): Promise<any> {
    try {
      const user = await this.usersService.createPass(password, auth);
      if(!user){
        throw new Error('Usuário não encontrado.');
      };
 
      return user ;
    } catch (error) {
      throw new Error(error.message);
    };
  };

  async validLoginCredentials(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.validateLoginCredentials(email, password);
      return user;
    } catch (error) {
      throw new Error('Erro ao validar credenciais de usuário.');
    };
  };

  async validToken(token: string): Promise<any> {
    try {
      const payload: any = jwt.verify(token, process.env.SECRET_APP_TOKEN);
      const valid_payload = this.usersService.validPayloadUser(payload);
      if (!valid_payload) {
        throw new NotFoundException('Usuário ou Empresa não existe.');
      };

      return payload.user;
    } catch (error) {
      throw new UnauthorizedException('Token de autenticação inválido');
    };
  };

  async validCreatePassToken(token: string): Promise<any> {
    try {
      const payload = jwt.verify(token, process.env.SECRET_CREATE_PASS_TOKEN);
      const valid_payload = this.usersService.validPayloadUser(payload);
      if (!valid_payload) {
        throw new NotFoundException('Usuário ou Empresa não existe.');
      };
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token de autenticação inválido');
    };
  };

  async validResetPassToken(token: string): Promise<any> {
    try {
      const payload = jwt.verify(token, process.env.SECRET_RESET_PASS_TOKEN);
      const valid_payload = this.usersService.validPayloadUser(payload);
      if (!valid_payload) {
        throw new NotFoundException('Usuário ou Empresa não existe.');
      };
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token de autenticação inválido');
    };
  };
};
