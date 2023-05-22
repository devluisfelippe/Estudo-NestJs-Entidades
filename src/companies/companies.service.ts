import { Injectable } from "@nestjs/common";
import { CompanyEntity } from "./company.entity";


@Injectable()
export class CompanyService {
    private companies: CompanyEntity[] = []
    
    async newCompany(company: CompanyEntity) {
        this.companies.push(company)
    }

    async getCompany() {
        return this.companies
    }
}