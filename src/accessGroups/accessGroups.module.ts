import { Module } from "@nestjs/common";
import { AccessController } from "./accessGroups.controller";
import { AccessService } from "./accessGroups.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessGroup } from "./access.entity";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/user.entity";
import { UserService } from "../users/users.service";

@Module({
    imports:[TypeOrmModule.forFeature([AccessGroup, User])],
    controllers: [AccessController],
    providers: [AccessService, UserService, AuthService, JwtService],
})
export class AccessModule {}