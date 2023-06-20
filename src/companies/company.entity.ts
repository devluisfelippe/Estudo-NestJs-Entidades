import { InventoryTransaction } from "../inventoryTransactions/inventory-transaction.entity";
import { Inventory } from "../inventories/inventory.entity";
import { Lot } from "../lots/lot.entity";
import { Product } from "../products/product.entity";
import { User } from "../users/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccessGroup } from "../accessGroups/access.entity";

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'character varying', length: 100, nullable: false })
    name: string;

    @Column({ name: 'legal_name', type: 'character varying', length: 100, nullable: false })
    legal_name: string;

    @Column({ name: 'tax_id', type: 'character varying', length: 14, nullable: false })
    tax_id: number;

    @OneToMany(type => User, user => user.company)
    users: User[];

    @OneToMany(type => Product, product => product.company)
    products: Product[];

    @OneToMany(type => Lot, lot => lot.company)
    lots: Lot[];

    @OneToMany(type => Inventory, inventory => inventory.company)
    inventories: Inventory[];

    @OneToMany(type => InventoryTransaction, inventoryTransaction => inventoryTransaction.company)
    inventories_transactions: InventoryTransaction[];

    @OneToMany(type => AccessGroup, accessGroup => accessGroup.company)
    access_groups: AccessGroup[];
}