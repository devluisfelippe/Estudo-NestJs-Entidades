import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Lot } from '../lots/lot.entity';
import { User } from '../users/user.entity';
import { InventoryTransactionController } from './inventories-transactions.controller';
import { InventoryTransactionService } from './inventories-transactions.service';
import { Inventory } from '../inventories/inventory.entity';
import { InventoryTransaction } from './inventory-transaction.entity';
import { InventoryService } from '../inventories/inventories.service';
import { LotService } from '../lots/lots.service';
import { Product } from '../products/product.entity';
import { ProductsService } from '../products/products.service';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Lot, User, AccessGroup, Inventory, Product, InventoryTransaction])],
    controllers: [InventoryTransactionController],
    providers: [InventoryService, LotService, ProductsService, InventoryTransactionService, AuthService, UserService, AccessService, JwtService],
})
export class InventoryTransactionModule { };