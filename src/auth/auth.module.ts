import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { User } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { CompanyService } from '../companies/companies.service';
import { Company } from '../companies/company.entity';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AccessGroup, Company])],
  controllers: [AuthController],
  providers: [AuthService, UserService, AccessService, CompanyService, JwtService]
})

export class AuthModule { };
