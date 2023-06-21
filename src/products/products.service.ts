import { Injectable } from "@nestjs/common";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) { };

    async createProduct(product, company_id: string): Promise<any> {
        try {
            const product_data = { ...product, company_id };
            await this.productRepository.save(product_data);
            return product;
        } catch (error) {
            throw new Error('Produto não foi criado!');
        };
    };

    async getProducts(): Promise<any> {
        try {
            const products = await this.productRepository.find({
                select: ['name', 'unit']
            });
            return products;
        } catch (error) {
            throw new Error('Produtos não foram encontrados!');
        };
    };

    async findProduct(product_id: string, company_id: string): Promise<any> {
        try {
            const product_exists = await this.productRepository.findOne({
                where: { id: product_id, company_id: company_id }
            });

            if (!product_exists) {
                throw new Error('Produto não encontrado.');
            };
            
            return product_exists;
        } catch (error) {
            throw new Error(error.message);
        };
    };
}