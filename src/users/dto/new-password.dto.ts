import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsValidPassConfirm } from "../../core/decorators/confirm-pass.decorator";

export class NewPasswordDTO {
    @IsNotEmpty({ message: 'A senha não pode ser vázia.' })
    old_password: string;

    @IsNotEmpty({ message: 'A  nova senha não pode ser vázia.' })
    @MaxLength(20, { message: 'A nova senha não pode ultrapassar 20 caracteres.' })
    @MinLength(8, { message: 'A nova senha não pode ser menor do que 8 caracteres' })
    new_password: string;

    @IsValidPassConfirm('new_password', { message: 'As senhas devem ser iguais.' })
    confirm_new_password: string;
};