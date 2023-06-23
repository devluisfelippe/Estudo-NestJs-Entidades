import { Injectable } from '@nestjs/common';
import { InventoryTransaction } from './inventory-transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoriesService } from '../inventories/inventories.service';
import { LotsService } from '../lots/lots.service';

@Injectable()
export class InventoriesTransactionsService {

    constructor(
        @InjectRepository(InventoryTransaction) private readonly inventoriesTransactionsRepository: Repository<InventoryTransaction>,
        private lotsService: LotsService,
        private inventoriesService: InventoriesService,
    ) { };

    async createTransaction(product_id: string, quantity: number, lot_id: string, company_id: string): Promise<any> {
        try {
            await this.lotsService.findLot(lot_id, product_id, company_id);
            const inventory = await this.inventoriesService.findInventory(lot_id, product_id, company_id);
            const inventory_transaction_data = { product_id, quantity, inventory, lot_id, company_id };

            const lot_quantity = Number(quantity);
            const inventory_quantity = Number(inventory.quantity);

            const new_inventory_quantity = inventory_quantity + (lot_quantity);
            if (lot_quantity === 0 || new_inventory_quantity < 0) {
                throw new Error('Valor da operação não pode ser zero ou maior que o inventário.');
            };

            const transaction = await this.inventoriesTransactionsRepository.save(inventory_transaction_data);
            await this.inventoriesService.updateInventory(lot_id, product_id, company_id, new_inventory_quantity);

            return transaction;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};
