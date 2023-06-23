import { ProductsService } from './../products/products.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Lot } from '../lots/lot.entity';
import { InventoriesController } from './inventories.controller';
import { InventoriesService } from './inventories.service';
import { Inventory } from './inventory.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Lot, Product, User, AccessGroup, Inventory])],
    controllers: [InventoriesController],
    providers: [InventoriesService, ProductsService, AuthService, UsersService, AccessService, JwtService],
})
export class InventoriesModule { };