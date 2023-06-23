import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';
import { CompaniesService } from '../companies/companies.service';
import { Company } from '../companies/company.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User, Company, AccessGroup])],
    controllers: [UsersController],
    providers: [UsersService, AccessService, AuthService, JwtService, CompaniesService],
})
export class UsersModule {}