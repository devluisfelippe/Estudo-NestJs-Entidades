import { Module } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CompanyController } from './companies.controller';


@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}