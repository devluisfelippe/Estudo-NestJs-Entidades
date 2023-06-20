import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CreateCompanyDTO } from './dto/createCompany.dto';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';



@Controller('/company')
export class CompanyController {
    constructor(private companyService: CompanyService ) {}

    @Post()
    async createCompany(@Body() company: CreateCompanyDTO): Promise<NestResponse>{
        try {
            await this.companyService.createCompany(company);
            return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .build();
        } catch (error) {
            throw new BadRequestException({
                status_code: HttpStatus.BAD_REQUEST,
                message: [error.message]
            });
        };


    };
};
