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
        const possibleId = this.inventories.find(
            inventorySave => inventorySave.id === id
        )

        if (!possibleId) {
            throw new Error('Inventário não existe')
        }

        return possibleId
    }

    async updateRepositories(id: string, repositoryData: Partial<InventoryEntity>) {
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
