import { CompanyService } from "src/companies/companies.service";
import { LotEntity } from "./lot.entity";

export class LotService {
    constructor(private readonly companyService: CompanyService){}
    
    private lotEntity: LotEntity[] = []

    async createLot(lot: LotEntity) {
        this.lotEntity.push(lot)
    }

    async lots() {
        return this.lotEntity
    }

}