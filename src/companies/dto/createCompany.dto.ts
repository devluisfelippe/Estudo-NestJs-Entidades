import { IsNotEmpty, IsNumberString, MaxLength } from 'class-validator';

export class createCompanyDTO {
    @IsNotEmpty({ message: 'O apelido não pode ser vazio.' })
    @MaxLength(50, { message: 'o apelido não pode ultrapassar 50 caracteres.' })
    name: string;

    @IsNotEmpty({ message: 'A razão social não pode ser vazia.' })
    @MaxLength(50, { message: 'A razão social não pode ultrapassar 50 caracteres.' })
    legal_name: string;

    @IsNotEmpty({ message: 'O CNPJ não pode ser nulo ou vazio.' })
    @IsNumberString()
    tax_id: number;
}