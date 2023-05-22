import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class createUserDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @MaxLength(50, { message: 'O nome não pode ultrapassar 50 caracteres.' })
    first_name: string;
    
    @IsNotEmpty({ message: 'O sobrenome não pode ser vazio' })
    @MaxLength(50, { message: 'O sobrenome não pode ultrapassar 50 caracteres.' })
    last_name: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    email: string;

    @IsNotEmpty({ message: 'A senha não pode ser vázia.' })
    @MaxLength(20, { message: 'A senha não pode ultrapassar 20 caracteres.' })
    password: string;

    @IsNotEmpty({ message: 'o ID do grupo de acesso não pode ser vázio.' })
    access_group_id: string;

    @IsNotEmpty({ message: 'o ID da empresa não pode ser vázio.' })
    company_id: string;
}
