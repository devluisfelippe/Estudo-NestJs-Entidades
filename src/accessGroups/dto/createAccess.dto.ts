import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class createAccessDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @MaxLength(50, { message: 'O nome não pode ultrapassar 50 caracteres.' })
    name: string;

    @IsNotEmpty({ message: 'o ID da empresa não pode ser vázio.' })
    company_id: string;
}
