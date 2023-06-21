import { IsEmail, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @MaxLength(50, { message: 'O nome não pode ultrapassar 50 caracteres.' })
    first_name: string;
    
    @IsNotEmpty({ message: 'O sobrenome não pode ser vazio' })
    @MaxLength(50, { message: 'O sobrenome não pode ultrapassar 50 caracteres.' })
    last_name: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    email: string;

    @IsUUID(4, {message: 'O id do grupo de acesso não pode ser vázio.'})
    access_group_id: string
}
