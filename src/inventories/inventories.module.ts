import { ProductsService } from './../products/products.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Lot } from '../lots/lot.entity';
import { InventoryController } from './inventories.controller';
import { InventoryService } from './inventories.service';
import { Inventory } from './inventory.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Lot, Product, User, AccessGroup, Inventory])],
    controllers: [InventoryController],
    providers: [InventoryService, ProductsService, AuthService, UserService, AccessService, JwtService],
})
export class InventoryModule { };