import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDTO } from './dto/createCompany.dto';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';



@Controller('/company')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) { }

    @Post()
    async createCompany(@Body() company: CreateCompanyDTO): Promise<NestResponse> {
        try {
            await this.companiesService.createCompany(company);
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
