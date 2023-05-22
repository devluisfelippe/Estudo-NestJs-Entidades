import { Injectable } from '@nestjs/common';
import { InventoryEntity } from './inventory.entity';

@Injectable()
export class InventoryService {
    private inventories: InventoryEntity[] = []

    async createInventory(inventory: InventoryEntity) {
        this.inventories.push(inventory)
    }

    async getInventories() {
        return this.inventories
    }

    private searchId(id: string) {
        const possibleInventory = this.inventories.find(
            invent => invent.id === id
        )

        if (!possibleInventory) {
            throw new Error('Inventário não existe')
        }

        return possibleInventory
    }

    async updateInventories(id: string, repositoryData: Partial<InventoryEntity>) {
        const inventory = this.searchId(id)

        Object.entries(repositoryData).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            inventory[chave] = valor;
        })

        return inventory;
    }
}
