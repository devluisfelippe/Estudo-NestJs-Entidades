import { Injectable } from "@nestjs/common"
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator"
import * as dayjs from "dayjs"

@Injectable()
@ValidatorConstraint({ async: true })
export class duedateValidation implements ValidatorConstraintInterface {

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const date = dayjs()
        const duedate = dayjs(value)

        if (duedate.isAfter(date)) {
            return false
        }
    }
}

export const DuedateIsValid = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: duedateValidation
        })
    }
}
