import { createUserDTO } from './dto/createInventory.dto';
import { updateInventoryDTO } from './dto/updateInventory.dto';
import { InventoryService } from './inventories.service';
import { InventoryEntity } from './inventory.entity';
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from "uuid";

@Controller('/inventories')
export class InventoryController {
    constructor(private inventoryService: InventoryService) {}

    @Post()
    async createInventory(@Body() inventory: createUserDTO){
        const inventoryEntity = new InventoryEntity()
        inventoryEntity.id = uuid()
        inventoryEntity.product_id = inventory.product_id
        inventoryEntity.lot_id = inventory.lot_id
        inventoryEntity.quantity = inventory.quantity
        inventoryEntity.company_id = inventory.company_id

        this.inventoryService.createInventory(inventoryEntity)

        return { message: "Inventário criado com sucesso!" }
    }

    @Get()
    async getInventories(){
        return this.inventoryService.getInventories()
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() updateInventory: updateInventoryDTO) {
        const updatedInventory = await this.inventoryService.updateRepositories(id, updateInventory);

        return {
            inventário: updatedInventory,
            message: 'Inventário atualizado com sucesso!'
        }
    }
}