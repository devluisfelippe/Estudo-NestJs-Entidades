import { IsDateString, IsDecimal, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateLotDTO {
    @IsNotEmpty({ message: 'a numeração do lote não pode ser vázio.' })
    @MaxLength(10, { message: 'a numeração do lote não pode ser maior que 10 caracteres' })
    code: string;

    @IsUUID(4, {message: 'O id de produto não pode ser vázio.'})
    product_id: string;

    @IsDecimal({ force_decimal: true, decimal_digits: '2'}, { message: "A quantidade precisa ser decimal, com duas casas e vírgula" })
    quantity: number;

    @IsNotEmpty({ message: 'A data de validade não pode ser vázia' })
    @IsDateString()
    duedate: string;
}
