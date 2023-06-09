import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { AuthRequestor } from '../core/decorators/auth.decorator';
import { AuthGuard } from '../core/guards/auth.guard';
import { InventoriesService } from './inventories.service';
import { BadRequestException, Controller, Get, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { NestResponse } from '../core/http/nest-response';

@Controller('/inventories')
export class InventoriesController {
    constructor(private inventoriesService: InventoriesService) { }

    @Get('/lot/:uuid_lot')
    @UseGuards(AuthGuard)
    async getInventoryByLotID(@AuthRequestor() auth: any, @Param('uuid_lot') lot_id: string): Promise<NestResponse> {
        try {
            const inventory_finded = await this.inventoriesService.getInventoryByLotID(lot_id, auth.user.company_id);
            return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .withNextAuth(auth.new_token)
                .withBody(inventory_finded)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };
    };
    
    @Get('/product/:uuid_product')
    @UseGuards(AuthGuard)
    async getInventoryByProductID(@AuthRequestor() auth: any, @Param('uuid_product') product_id: string): Promise<NestResponse> {
        try {
            const inventory_finded = await this.inventoriesService.getInventoryByProductID(product_id, auth.user.company_id);
            return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .withNextAuth(auth.new_token)
                .withBody(inventory_finded)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };
    };
};