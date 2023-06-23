import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lot } from "./lot.entity";
import { InventoriesService } from "../inventories/inventories.service";
import { ProductsService } from "../products/products.service";

export class LotsService {

    constructor(
        @InjectRepository(Lot) private readonly lotsRepository: Repository<Lot>,
        private productsService: ProductsService,
        private inventoriesService: InventoriesService
    ) { };

    async findLot(lot_id: string, product_id: string, company_id: string): Promise<any> {
        try {
            const lot_exists = await this.lotsRepository.findOne({
                where: { id: lot_id, product_id: product_id, company_id: company_id }
            });
            
            if (!lot_exists) {
                throw new Error('Lote não encontrado');
            };

            return true;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createLot(lot, company_id: string): Promise<any> {
        try {
            await this.productsService.findProduct(lot.product_id, company_id);
            const lot_data = { ...lot, company_id };
            await this.lotsRepository.save(lot_data);

            await this.inventoriesService.createInventory(
                lot_data.product_id, lot_data.id, lot.quantity, company_id
            );
            
            return lot;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getLot(): Promise<any> {
        try {
            const lots = await this.lotsRepository.find({
                select: ['code']
            });
            return lots;
        } catch (error) {
            throw new Error('Lots não foram encontrados!');
        };
    };
};