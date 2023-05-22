import { ProductEntity } from './product.entity';
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { v4 as uuid } from 'uuid';
import { createProductDTO } from './dto/createProduct.dto';

@Controller('/products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @Post()
    async createProduct(@Body() product: createProductDTO) {
        const productEntity = new ProductEntity()
        productEntity.id = uuid()
        productEntity.name = product.name
        productEntity.unit = product.unit
        productEntity.company_id = product.company_id

        this.productsService.createProduct(productEntity)

        return productEntity
    }

    @Get()
    async getProducts(){
        console.log(this.productsService)
        return this.productsService.getProduct()
    }
}