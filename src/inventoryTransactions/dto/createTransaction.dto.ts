import { IsDecimal, IsUUID } from 'class-validator';

export class CreateInventoryTransactionDTO {
    @IsUUID(4, {message: 'O id de produto não pode ser vázio.'})
    product_id: string;

    @IsDecimal({ force_decimal: true, decimal_digits: '2'}, { message: "A quantidade precisa ser decimal, com duas casas e vírgula" })
    quantity: number;
}
