import { InventoryTransaction } from "../inventoryTransactions/inventory-transaction.entity";
import { Company } from "../companies/company.entity";
import { Lot } from "../lots/lot.entity";
import { Product } from "../products/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('inventories')
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'quantity', type: 'numeric', precision: 10, scale: 2, nullable: true })
    quantity: number;
    
    @Column()
    product_id: string;
    
    @ManyToOne(type => Product, product => product.inventories)
    @JoinColumn([
        { name: "product_id", referencedColumnName: "id" }
    ])
    product: Product;

    @Column()
    company_id: string;
    
    @ManyToOne(type => Company, company => company.inventories)
    @JoinColumn([
        { name: "company_id", referencedColumnName: "id" }
    ])
    company: Company;

    @Column()
    lot_id: string;

    @OneToOne(type => Lot, lot => lot.inventory)
    @JoinColumn([
        { name: "lot_id", referencedColumnName: "id" }
    ])
    lot: Lot;

    @OneToMany(type => InventoryTransaction, inventoryTransaction => inventoryTransaction.inventory_id)
    inventory_transaction: InventoryTransaction;
}