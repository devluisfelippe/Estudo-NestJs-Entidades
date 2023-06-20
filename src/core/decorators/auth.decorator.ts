import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
//import { UpdateCoworkerDto } from '../../ex/coworkers/dto/updatecoworker.dto';

export const AuthUser: any = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return request.user;
    } else {
      return null;
    }
  }
);

export const AuthMe: any = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.me) {
      return request.me;
    } else {
      return null;
    }
  }
);

export const AuthCompaniesUser: any = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.companies) {
      return request.companies;
    } else {
      return null;
    }
  }
);

export const AuthCompanyUserSigIn: any = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.companies && request.user) {
      return { companies: request.companies, user: request.user };
    } else {
      return null;
    }
  }
);

export const AuthAppAgent: any = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.app_agent) {
      return request.app_agent;
    } else {
      return null;
    }
  }
);

export const AuthRequestor: any = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return {
        user: request.user,
        new_token: request.new_token
      };
    } else {
      return null;
    }
  }
);

export const AuthPassRequestor: any = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return request.user
    } else {
      return null;
    }
  }
);
