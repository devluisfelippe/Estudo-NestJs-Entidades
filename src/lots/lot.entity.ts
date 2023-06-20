import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product.entity";
import { Company } from "../companies/company.entity";
import { Inventory } from "../inventories/inventory.entity";
import { InventoryTransaction } from "../inventoryTransactions/inventory-transaction.entity";
@Entity('lots')
export class Lot {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'code', type: 'character varying', length: 10, nullable: false })
    code: string;

    @Column({ name: 'duedate', type: 'date', nullable: false })
    duedate: string;
    
    @Column()
    company_id: string;
    
    @ManyToOne(type => Company, company => company.lots)
    @JoinColumn([
        { name: "company_id", referencedColumnName: "id" }
    ])
    company: Company;

    @Column()
    product_id: string;

    @ManyToOne(type => Product, product => product.lots)
    @JoinColumn([
        { name: "product_id", referencedColumnName: "id" }
    ])
    product: Product;

    @OneToOne(type => Inventory, inventory => inventory.lot)
    inventory: Inventory;
    
    @OneToMany(type => InventoryTransaction, inventoryTransaction => inventoryTransaction.lot)
    inventories_transactions: InventoryTransaction[];
}