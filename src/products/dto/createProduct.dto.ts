import { IsIn, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateProductDTO {
    @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
    @MaxLength(50, { message: 'O nome do produto não pode ultrapassar 50 caracteres.' })
    name: string;

    @IsIn(['KG', 'PC'], { message: "Não foi possível reconhecer o tipo de unidade. Unidades: 'KG', 'PC'" })
    unit: string;
}
