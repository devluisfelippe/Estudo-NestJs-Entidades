import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { createUserDTO } from "./dto/createuUser.dto";

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}


    @Post()
    async createUser(@Body() user: createUserDTO){
        const userEntity = new UserEntity()
        userEntity.id = uuid()
        userEntity.first_name = user.first_name
        userEntity.last_name = user.last_name
        userEntity.email = user.email
        userEntity.password = user.password
        userEntity.access_group_id = user.access_group_id
        userEntity.company_id = user.company_id

        this.userService.createUsers(userEntity)

        return { message: "Usuário criado com sucesso!" }
    }

    @Get()
    async getUsers(){
        const users = await this.userService.getUsers()

        const user = users.map((user) => {
            return { 
                id: user.id,
                usuário: user.first_name,
                email: user.email,
                grupoDeAcesso: user.access_group_id,
                empresa: user.company_id
            }
        })

        return user
    }
}