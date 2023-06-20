import { Company } from "../companies/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lot } from "../lots/lot.entity";
import { Inventory } from "../inventories/inventory.entity";
import { InventoryTransaction } from "../inventoryTransactions/inventory-transaction.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name_product', type: 'character varying', length: 100, nullable: false })
    name: string;

    @Column({ name: 'unit', type: 'character varying', length: 4, nullable: false })
    unit: string;
    
    @Column()
    company_id: string;
    
    @ManyToOne(type => Company, company => company.products)
    @JoinColumn([
        { name: "company_id", referencedColumnName: "id" }
    ])
    company: Company;

    @OneToMany(type => Lot, lot => lot.product)
    lots: Lot[];

    @OneToMany(type => Inventory, inventory => inventory.company)
    inventories: Inventory[];

    @OneToMany(type => InventoryTransaction, inventoryTransaction => inventoryTransaction.product_id)
    inventories_transactions: InventoryTransaction[];
}