import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CompanyEntity } from './company.entity';
import { CompanyService } from './companies.service';
import { v4 as uuid } from 'uuid';
import { createCompanyDTO } from './dto/createCompany.dto';



@Controller('/company')
export class CompanyController {
    constructor(private companyService: CompanyService ) {}

    @Post()
    async createCompany(@Body() newCompany: createCompanyDTO){
        const companyEntity = new CompanyEntity()
        companyEntity.id = uuid()
        companyEntity.name = newCompany.name
        companyEntity.legal_name = newCompany.legal_name
        companyEntity.tax_id = newCompany.tax_id

        this.companyService.newCompany(companyEntity)
        return {
            company: companyEntity
        }
    }

    @Get()
    async getCompany() {
        const companies = await this.companyService.getCompany()

        return companies
    }

}
