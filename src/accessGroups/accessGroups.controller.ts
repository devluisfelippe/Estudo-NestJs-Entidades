import { BadRequestException, Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AccessService } from "./accessGroups.service";
import { CreateAccessDTO } from "./dto/createAccess.dto";
import { AuthGuard } from "../core/guards/auth.guard";
import { AuthRequestor } from "../core/decorators/auth.decorator";
import { NestResponse } from "../core/http/nest-response";
import { NestResponseBuilder } from "../core/http/nest-response-builder";

@Controller('/access')
export class AccessController {
    constructor(private accessService: AccessService){}

    @Post()
    @UseGuards(AuthGuard) 
    async createAccess(@AuthRequestor() auth: any, @Body() access_group: CreateAccessDTO): Promise<NestResponse> {
        try {
            await this.accessService.createAccess(access_group, auth.user.company_id);
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
};