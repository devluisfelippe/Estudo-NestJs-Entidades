import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthResetPass implements CanActivate {
  constructor(private authService: AuthService) { }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers['reset_pass_token'];

    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    };

    try {
      const user = await this.authService.verifyResetPassToken(token);
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token de autenticação inválido');
    };
  };
};