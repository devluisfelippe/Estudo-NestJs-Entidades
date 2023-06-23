import { ProductsService } from './../products/products.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Lot } from './lot.entity';
import { LotsController } from './lots.controller';
import { LotsService } from './lots.service';
import { Product } from '../products/product.entity';
import { Inventory } from '../inventories/inventory.entity';
import { InventoriesService } from '../inventories/inventories.service';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Lot, Inventory, User, AccessGroup])],
    controllers: [LotsController],
    providers: [LotsService, ProductsService, InventoriesService, AuthService, UsersService, AccessService, JwtService],
})
export class LotsModule { }