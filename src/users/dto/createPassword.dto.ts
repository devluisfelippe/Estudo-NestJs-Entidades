import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePasswordDTO {
    @IsNotEmpty({ message: 'A senha não pode ser vázia.' })
    @MaxLength(20, { message: 'A senha não pode ultrapassar 20 caracteres.' })
    password: string;
}