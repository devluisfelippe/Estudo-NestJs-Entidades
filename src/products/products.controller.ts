import { BadRequestException, Body, Controller, Get, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDTO } from './dto/createProduct.dto';
import { NestResponseBuilder } from '../core/http/nest-response-builder';
import { AuthGuard } from '../core/guards/auth.guard';
import { AuthRequestor } from '../core/decorators/auth.decorator';
import { NestResponse } from "../core/http/nest-response";

@Controller('/products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Post()
    @UseGuards(AuthGuard)
    async createProduct(@AuthRequestor() auth: any, @Body() product: CreateProductDTO): Promise<NestResponse> {
        try {
            const product_saved = await this.productsService.createProduct(product, auth.user.company_id);
            return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .withNextAuth(auth.new_token)
                .withBody({
                    name: product_saved.name,
                    unit: product_saved.unit
                })
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };
    };

    @Get()
    @UseGuards(AuthGuard)
    async getUsers(@AuthRequestor() auth: any) {
        try {
            const products = await this.productsService.getProducts();
            return new NestResponseBuilder()
                .withStatus(HttpStatus.OK)
                .withNextAuth(auth.new_token)
                .withBody(products)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };
    };
};