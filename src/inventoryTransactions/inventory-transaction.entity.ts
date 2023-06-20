import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../companies/company.entity";
import { Product } from "../products/product.entity";
import { Lot } from "../lots/lot.entity";
import { Inventory } from "../inventories/inventory.entity";

@Entity('inventories_transactions')
export class InventoryTransaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    product_id: string;

    @ManyToOne(type => Product, product => product.inventories_transactions)
    @JoinColumn([
        { name: "product_id", referencedColumnName: "id" }
    ])
    product: Product;

    @Column()
    lot_id: string;

    @ManyToOne(type => Lot, lot => lot.inventories_transactions)
    @JoinColumn([
        { name: "lot_id", referencedColumnName: "id" }
    ])
    lot: Lot;

    @Column({ name: 'quantity', type: 'numeric', precision: 10, scale: 2, nullable: true })
    quantity: number;

    @CreateDateColumn()
    transaction_date: Date;

    @Column()
    inventory_id: string;

    @ManyToOne(type => Inventory, inventory => inventory.inventory_transaction)
    @JoinColumn([
        { name: "inventory_id", referencedColumnName: "id" }
    ])
    inventory: Inventory;

    @Column()
    company_id: string;

    @ManyToOne(type => Company, company => company.inventories_transactions)
    @JoinColumn([
        { name: "company_id", referencedColumnName: "id" }
    ])
    company: Company;
}