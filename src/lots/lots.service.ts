import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lot } from "./lot.entity";
import { InventoryService } from "../inventories/inventories.service";
import { ProductsService } from "../products/products.service";

export class LotService {

    constructor(
        @InjectRepository(Lot) private readonly lotRepository: Repository<Lot>,
        private productService: ProductsService,
        private inventoryService: InventoryService
    ) { };

    async findLot(lot_id: string, product_id: string, company_id: string): Promise<any> {
        try {
            const lot_exists = await this.lotRepository.findOne({
                where: { id: lot_id, product_id: product_id, company_id: company_id }
            });
            
            if (!lot_exists) {
                throw new Error('Lote não encontrado')
            };

            return true;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createLot(lot, company_id: string): Promise<any> {
        try {
            await this.productService.findProduct(lot.product_id, company_id);
            const lot_data = { ...lot, company_id };
            await this.lotRepository.save(lot_data);

            await this.inventoryService.createInventory(
                lot_data.product_id, lot_data.id, lot.quantity, company_id
            );
            
            return lot;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getLot(): Promise<any> {
        try {
            const lots = await this.lotRepository.find({
                select: ['code']
            });
            return lots;
        } catch (error) {
            throw new Error('Lots não foram encontrados!');
        };
    };
};