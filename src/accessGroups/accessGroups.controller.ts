import { Body, Controller, Get, Post } from "@nestjs/common";
import { AccessService } from "./accessGroups.service";
import { AccessEntity } from "./access.entity";
import { v4 as uuid } from "uuid";
import { createAccessDTO } from "./dto/createAccess.dto";

@Controller('/access')
export class AccessController {
    constructor(private accessService: AccessService){}

    @Post() 
    async createAccess(@Body() access: createAccessDTO) {
        const accessEntity = new AccessEntity()
        accessEntity.id = uuid()
        accessEntity.name = access.name
        accessEntity.company_id = access.company_id

        this.accessService.createAccess(accessEntity)

        return { message: "Grupo de acesso criado com sucesso!" }
    }

    @Get()
    async getAccess() {
        return this.accessService.accessGroups()
    }
}