import { IsDecimal, IsNotEmpty } from 'class-validator';

export class createUserDTO {

    @IsNotEmpty({ message: 'o ID do produto não pode ser vázio.' })
    product_id: string;

    @IsNotEmpty({ message: 'o ID do lote não pode ser vázio.' })
    lot_id: string;
    
    @IsDecimal({ force_decimal: true, decimal_digits: '2', locale: 'pt-PT'}, { message: "A quantidade precisa ser decimal, com duas casas e vírgula" })
    quantity: number;

    @IsNotEmpty({ message: 'o ID da empresa não pode ser vázio.' })
    company_id: string;
}
