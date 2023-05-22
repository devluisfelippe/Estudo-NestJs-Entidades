import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductsService {
    private productEntity: ProductEntity[] = []

    async createProduct(product: ProductEntity) {
        this.productEntity.push(product)
    }

    async getProduct(){
        return this.productEntity
    }
}