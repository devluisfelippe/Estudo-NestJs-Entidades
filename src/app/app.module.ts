import { Module } from '@nestjs/common';
import { AccessModule } from 'src/accessGroups/accessGroups.module';
import { CompanyModule } from 'src/companies/companies.module';
import { InventoryModule } from 'src/inventories/inventories.module';
import { TransactionModule } from 'src/inventoryTransactions/transactions.module';
import { LotsModule } from 'src/lots/lots.module';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/users/users.module';


@Module({
  imports: [CompanyModule, UserModule, ProductsModule, AccessModule, LotsModule, InventoryModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
