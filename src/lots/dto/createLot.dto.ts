import { IsNotEmpty, MaxLength } from 'class-validator';

export class createLotDTO {

    @IsNotEmpty({ message: 'a numeração do lote não pode ser vázio.' })
    @MaxLength(10, { message: 'a numeração do lote não pode ser maior que 10 caracteres' })
    code: string;

    @IsNotEmpty({ message: 'o ID do produto não pode ser vázio.' })
    product_id: string;

    @IsNotEmpty({ message: 'A data de validade não pode ser vázia' })
    duedate: string;

    @IsNotEmpty({ message: 'o ID da empresa não pode ser vázio.' })
    company_id: string;
}
