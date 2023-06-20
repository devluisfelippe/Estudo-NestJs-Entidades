import { IsNotEmpty, IsNumberString, IsString, MaxLength } from 'class-validator';

export class CreateCompanyDTO {
    @IsString()
    @IsNotEmpty({ message: 'O apelido não pode ser vazio.' })
    @MaxLength(50, { message: 'o apelido não pode ultrapassar 50 caracteres.' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'A razão social não pode ser vazia.' })
    @MaxLength(50, { message: 'A razão social não pode ultrapassar 50 caracteres.' })
    legal_name: string;

    @IsString()
    @IsNotEmpty({ message: 'O CNPJ não pode ser nulo ou vazio.' })
    @IsNumberString()
    tax_id: number;
}