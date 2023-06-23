import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from '../accessGroups/accessGroups.module';
import { AuthModule } from '../auth/auth.module';
import { HttpExceptionFilter } from '../common/filters/exceptions.filter';
import { CompaniesModule } from '../companies/companies.module';
import { PostgresConfigService } from '../config/postgres.config.service';
import { InventoriesModule } from '../inventories/inventories.module';
import { InventoriesTransactionsModule } from '../inventoryTransactions/inventories-transactions.module';
import { LotsModule } from '../lots/lots.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { ResponseTransformationInterceptor } from '../core/http/response.interceptor';


@Module({
  imports: [
    CompaniesModule,
    UsersModule,
    ProductsModule,
    AccessModule,
    LotsModule,
    InventoriesModule,
    InventoriesTransactionsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformationInterceptor
    }
  ],
})
export class AppModule { }
