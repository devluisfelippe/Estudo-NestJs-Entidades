import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService{
    private users: UserEntity[] = []

    async createUsers(user: UserEntity){
        this.users.push(user)
    }

    async getUsers(){
        return this.users
    }
}