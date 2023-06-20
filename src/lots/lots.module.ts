import { ProductsService } from './../products/products.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { Lot } from './lot.entity';
import { LotController } from './lots.controller';
import { LotService } from './lots.service';
import { Product } from '../products/product.entity';
import { Inventory } from '../inventories/inventory.entity';
import { InventoryService } from '../inventories/inventories.service';
import { AccessService } from '../accessGroups/accessGroups.service';
import { AccessGroup } from '../accessGroups/access.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Lot, Inventory, User, AccessGroup])],
    controllers: [LotController],
    providers: [LotService, ProductsService, InventoryService, AuthService, UserService, AccessService, JwtService],
})
export class LotsModule { }