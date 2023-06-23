import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Lot } from '../lots/lot.entity';
import { User } from '../users/user.entity';
import { InventoriesTransactionsController } from './inventories-transactions.controller';
import { InventoriesTransactionsService } from './inventories-transactions.service';
import { Inventory } from '../inventories/inventory.entity';
import { InventoryTransaction } from './inventory-transaction.entity';
import { InventoriesService } from '../inventories/inventories.service';
import { LotsService } from '../lots/lots.service';
import { Product } from '../products/product.entity';
import { ProductsService } from '../products/products.service';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Lot, User, AccessGroup, Inventory, Product, InventoryTransaction])],
    controllers: [InventoriesTransactionsController],
    providers: [InventoriesService, LotsService, ProductsService, InventoriesTransactionsService, AuthService, UsersService, AccessService, JwtService],
})
export class InventoriesTransactionsModule { };