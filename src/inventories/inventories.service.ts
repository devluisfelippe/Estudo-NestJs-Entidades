import { Injectable } from '@nestjs/common';
import { Inventory } from './inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class InventoriesService {
    constructor(
        @InjectRepository(Inventory) private readonly inventoriesRepository: Repository<Inventory>
    ) { };

    async createInventory(product_id: string, lot_id: string, quantity: number, company_id: string): Promise<any> {
        try {
            const inventory_data = { product_id, lot_id, quantity, company_id };
            await this.inventoriesRepository.save(inventory_data);
            return inventory_data;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async findInventory(lot_id: string, product_id: string, company_id: string): Promise<any> {
        try {
            const inventory_exists = await this.inventoriesRepository.findOne({
                where: { lot_id: lot_id, product_id: product_id, company_id: company_id }
            });

            if (!inventory_exists) {
                throw new Error('Inventário não encontrado');
            };

            return inventory_exists;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async updateInventory(lot_id: string, product_id: string, company_id: string, quantity: number): Promise<any> {
        try {
            const inventory_updated = await this.inventoriesRepository.update({ lot_id, product_id, company_id }, { quantity: quantity });
            return inventory_updated;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getInventoryByLotID(lot_id: string, company_id: string): Promise<any> {
        try {
            const inventory_exists = await this.inventoriesRepository.findOne({
                where: { lot_id: lot_id, company_id: company_id },
                relations: {
                    lot: true,
                },
                select: {
                    id: true,
                    quantity: true,
                    lot: {
                        id: true,
                        code: true,
                    },
                },
            });

            if (!inventory_exists) {
                throw new Error('Inventário não encontrado');
            };

            return inventory_exists;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getInventoryByProductID(product_id: string, company_id: string): Promise<any> {
        try {
            const inventory_exists = await this.inventoriesRepository.findOne({
                where: { product_id: product_id, company_id: company_id },
                relations: {
                    product: true,
                    lot: true,
                },
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        id: true,
                        name: true,
                        unit: true,
                    },
                    lot: {
                        id: true,
                        code: true,
                        duedate: true,
                    },
                }
            });

            if (!inventory_exists) {
                throw new Error('Inventário não encontrado');
            };

            return inventory_exists;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};
