import { IsIn, IsNotEmpty, MaxLength } from 'class-validator';

export class createProductDTO {
    @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
    @MaxLength(50, { message: 'O nome do produto não pode ultrapassar 50 caracteres.' })
    name: string;

    @IsIn(['KG', 'PC'], { message: "Não foi possível reconhecer o tipo de unidade. Unidades: 'KG', 'PC'" })
    unit: string;

    @IsNotEmpty({ message: 'o ID da empresa não pode ser vázio.' })
    company_id: string;
}
