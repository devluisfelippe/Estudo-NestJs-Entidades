import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsValidPassConfirm } from "../../core/decorators/confirm-pass.decorator";


export class EmailResetPasswordDTO {
    @IsNotEmpty({ message: 'O e-mail não pode ser vázio.' })
    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    email: string;
};

export class ResetPasswordDTO {
    @IsNotEmpty({ message: 'A senha não pode ser vázia.' })
    @MaxLength(20, { message: 'A senha não pode ultrapassar 20 caracteres.' })
    @MinLength(8, { message: 'A senha não pode ser menor do que 8 caracteres' })
    password: string;

    @IsValidPassConfirm('password', { message: 'As senhas devem ser iguais.' })
    confirm_password: string;
};
