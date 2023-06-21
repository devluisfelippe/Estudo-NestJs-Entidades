import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { NestResponseBuilder } from "../core/http/nest-response-builder";
import { AuthGuard } from "../core/guards/auth.guard";
import { AuthPassRequestor, AuthRequestor } from "../core/decorators/auth.decorator";
import { NestResponse } from "../core/http/nest-response";
import { AuthPass } from "../core/guards/auth-pass.guard";
import { CreatePasswordDTO } from "./dto/create-password.dto";
import { NewPasswordDTO } from "./dto/new-password.dto";

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    @UseGuards(AuthGuard)
    async createUser(@AuthRequestor() auth: any, @Body() user: CreateUserDTO): Promise<NestResponse> {
        try {
            const status_user = 'PENDING'
            await this.userService.createUser(user, status_user, auth.user.company_id);
            return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .withNextAuth(auth.new_token)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };
    };

    @Post('/password')
    @UseGuards(AuthPass)
    async createPassword(@AuthPassRequestor() auth: any, @Body() pass: CreatePasswordDTO): Promise<NestResponse> {
        try {
            await this.userService.createPass(pass.password, auth);
            return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };
    };

    @Put('/:uuid_user/password')
    @UseGuards(AuthGuard)
    async updatePassword(@AuthRequestor() auth: any, @Param('uuid_user') user_id: string, @Body() password: NewPasswordDTO): Promise<NestResponse> {
        try {
            if (user_id !== auth.user.user_id) {
                throw new Error('ID de usuário divergente de usuário logado.');
            };
            
            const valid_pass = await this.userService.validPassUser(password.old_password, auth.user.user_id, auth.user.company_id);
            if (!valid_pass) {
                throw new Error('Senha inválida.');
            };

            await this.userService.createNewPass(password.confirm_new_password, auth.user);
            return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .withNextAuth(auth.new_token)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };
    };

    @Get()
    @UseGuards(AuthGuard)
    async getUsers(@AuthRequestor() auth: any) {
        try {
            const users = await this.userService.getUsers();
            return new NestResponseBuilder()
                .withStatus(HttpStatus.OK)
                .withNextAuth(auth.new_token)
                .withBody(users)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        }
    };

    @Delete('/:id')
    @UseGuards(AuthGuard)
    async deleteUser(@AuthRequestor() auth: any, @Param('id') id: string) {
        try {
            await this.userService.deleteUser(id);
            return new NestResponseBuilder()
                .withStatus(HttpStatus.OK)
                .withNextAuth(auth.new_token)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };
    };
}