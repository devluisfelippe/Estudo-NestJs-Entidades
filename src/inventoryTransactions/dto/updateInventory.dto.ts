import { IsDecimal } from 'class-validator';

export class UpdateInventoryDTO {
    @IsDecimal({ force_decimal: true, decimal_digits: '2', locale: 'pt-PT'}, { message: "A quantidade precisa ser decimal, com duas casas e vírgula" })
    quantity: number;
}
