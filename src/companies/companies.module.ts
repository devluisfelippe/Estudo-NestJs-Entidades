import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { User } from '../users/user.entity';
import { AccessGroup } from '../accessGroups/access.entity';
import { UsersService } from '../users/users.service';
import { CompaniesService } from './companies.service';
import { AccessService } from '../accessGroups/accessGroups.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';


@Module({
  imports:[TypeOrmModule.forFeature([Company, User, AccessGroup])],
  controllers: [CompaniesController],
  providers: [CompaniesService, AccessService, UsersService, AuthService, JwtService],
})
export class CompaniesModule {}