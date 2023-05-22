import { CompanyService } from "src/companies/companies.service";
import { AccessEntity } from "./access.entity";

export class AccessService {
    constructor(private readonly companyService: CompanyService){}
    
    private accessEntity: AccessEntity[] = []

    async createAccess(access: AccessEntity) {
        this.accessEntity.push(access)
    }
    
    async accessGroups() {
        return this.accessEntity
    }

}