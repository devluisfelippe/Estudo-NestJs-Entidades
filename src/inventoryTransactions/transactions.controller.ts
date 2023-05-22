
import { Body, Controller, Get, Post } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { TransactionService } from "./transactions.service";
import { TransactionEntity } from "./transaction.entity";
import { createTransactionDTO } from "./dto/createTransaction.dto";
import * as dayjs from 'dayjs'


@Controller('/transactions')
export class TransactionController {
    constructor(private inventoryService: TransactionService) {}

    @Post()
    async createInventory(@Body() transactionInventory: createTransactionDTO){
        const transactionEntity = new TransactionEntity()
        transactionEntity.id = uuid()
        transactionEntity.product_id = transactionInventory.product_id
        transactionEntity.lot_id = transactionInventory.lot_id
        transactionEntity.quantity = transactionInventory.quantity
        transactionEntity.transaction_date = dayjs().format("YYYY-MM-DD")
        transactionEntity.inventory_id = transactionInventory.inventory_id
        transactionEntity.company_id = transactionInventory.company_id

        this.inventoryService.createTransactions(transactionEntity)

        return { message: "Alteração feita no inventário com sucesso!" }
    }

    @Get()
    async getInventories(){
        return this.inventoryService.getTransactions()
    }
}