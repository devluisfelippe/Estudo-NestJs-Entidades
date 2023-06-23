import { BadRequestException, Body, Controller, Get, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { LotsService } from "./lots.service";
import { CreateLotDTO } from "./dto/createLot.dto";
import { NestResponse } from "../core/http/nest-response";
import { AuthGuard } from "../core/guards/auth.guard";
import { AuthRequestor } from "../core/decorators/auth.decorator";
import { NestResponseBuilder } from "../core/http/nest-response-builder";

@Controller('/lots')
export class LotsController {
    constructor(private lotsService: LotsService){}

    @Post()
    @UseGuards(AuthGuard) 
    async createLot(@AuthRequestor() auth: any, @Body() lot: CreateLotDTO): Promise<NestResponse> {
        try {
            const lot_saved = await this.lotsService.createLot(lot, auth.user.company_id);
            return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .withNextAuth(auth.new_token)
                .withBody({
                    code: lot_saved.code
                })
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
    async getlot(@AuthRequestor() auth: any): Promise<NestResponse> {
        try {
            const lots = await this.lotsService.getLot();
            return new NestResponseBuilder()
                .withStatus(HttpStatus.OK)
                .withNextAuth(auth.new_token)
                .withBody(lots)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };
    };
}