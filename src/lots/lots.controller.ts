import { Body, Controller, Get, Post } from "@nestjs/common";
import { LotService } from "./lots.service";
import { LotEntity } from "./lot.entity";
import { v4 as uuid } from "uuid";
import { createLotDTO } from "./dto/createLot.dto";

@Controller('/lots')
export class LotController {
    constructor(private lotService: LotService){}

    @Post() 
    async createLot(@Body() lot: createLotDTO) {
        const lotEntity = new LotEntity()
        lotEntity.id = uuid()
        lotEntity.code = lot.code
        lotEntity.product_id = lot.product_id
        lotEntity.duedate = lot.duedate
        lotEntity.company_id = lot.company_id

        this.lotService.createLot(lotEntity)

        return { message: "Lot criado com sucesso!" }
    }

    @Get()
    async getlot() {
        return this.lotService.lots()
    }
}