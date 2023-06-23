import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers['x-auth'];

    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    };

    try {
      const user = await this.authService.validToken(token);
      const new_token = await this.authService.createToken(user);
      request.user = user;
      request.new_token = new_token
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token de autenticação inválido');
    };
  };
};