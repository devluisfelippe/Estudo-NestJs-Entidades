import { Injectable } from '@nestjs/common';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionService {
    private transactions: TransactionEntity[] = []

    async createTransactions(transaction: TransactionEntity) {
        this.transactions.push(transaction)
    }

    async getTransactions() {
        return this.transactions
    }

}
