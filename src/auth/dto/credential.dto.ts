import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";


export class CredentialDTO {

    @IsNotEmpty({ message: 'O e-mail não pode ser vázio.' })
    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    email: string;

    @IsNotEmpty({ message: 'A senha não pode ser vázia.' })
    @MaxLength(20, { message: 'Senha inválida.' })
    password: string;

};
