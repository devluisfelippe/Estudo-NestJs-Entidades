import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty({ message: 'O número do lote não pode ser vázio.' })
    lot_code: string;
    
    @IsDecimal({ force_decimal: true, decimal_digits: '2', locale: 'pt-PT'}, { message: "A quantidade precisa ser decimal, com duas casas e vírgula" })
    quantity: number;
}
