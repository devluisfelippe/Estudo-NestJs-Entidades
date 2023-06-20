import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User, AccessGroup])],
    controllers: [UserController],
    providers: [UserService, AccessService,AuthService, JwtService],
})
export class UserModule {}