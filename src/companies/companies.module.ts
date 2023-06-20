import { Module } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CompanyController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { UserService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Company, User, AccessGroup])], 
  controllers: [CompanyController],
  providers: [CompanyService, AccessService,UserService, AuthService, JwtService],
})
export class CompanyModule {}