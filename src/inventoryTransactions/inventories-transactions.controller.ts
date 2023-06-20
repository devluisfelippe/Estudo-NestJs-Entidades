
import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { InventoryTransactionService } from "./inventories-transactions.service";
import { CreateInventoryTransactionDTO } from "./dto/createTransaction.dto";
import { NestResponse } from "../core/http/nest-response";
import { AuthGuard } from "../core/guards/auth.guard";
import { NestResponseBuilder } from "../core/http/nest-response-builder";
import { AuthRequestor } from "../core/decorators/auth.decorator";


@Controller('/inventorytransactions')
export class InventoryTransactionController {
    constructor(private inventoryTransactionService: InventoryTransactionService) { }

    @Post('/lot/:uuid_lot')
    @UseGuards(AuthGuard)
    async createTransactionInventory(
        @AuthRequestor() auth: any, @Param('uuid_lot') lot_id: string, @Body() new_transaction: CreateInventoryTransactionDTO
    ): Promise<NestResponse> {
        try {
            await this.inventoryTransactionService.createTransaction(new_transaction.product_id, new_transaction.quantity, lot_id, auth.user.company_id);
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