import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAccessDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @MaxLength(50, { message: 'O nome não pode ultrapassar 50 caracteres.' })
    name: string;

}
