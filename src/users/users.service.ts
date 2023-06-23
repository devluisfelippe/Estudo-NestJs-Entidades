import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { AccessService } from '../accessGroups/accessGroups.service';
import { sendCreatePasswordEmail } from '../utils/send-email';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService,
        private accessService: AccessService,
    ) { };
    
    async userExists(user): Promise<any> {
        try {
            const user_exists = await this.usersRepository.findOne(
                {
                    where: { email: user.email },
                    relations: {
                        company: true,
                        access_group: true
                    },
                    select: {
                        id: true,
                        first_name: true,
                        password: true,
                        email: true,
                        status: true,
                        company_id: true,
                        access_group_id: true,
                        company: {
                            legal_name: true,
                            name: true,
                            tax_id: true,
                        },
                        access_group: {
                            name: true,
                        },
                    },
                }
            );

            if (!user_exists) {
                return null;
            };

            return user_exists;
        } catch (error) {
            throw new Error('Não foi possível encontrar o usuário.')
        };
    };

    async validateLoginCredentials(user_email: string, user_password: string): Promise<any> {
        try {
            const user = await this.userExists(user_email)
            const valid_password = await bcrypt.compare(user_password, user.password);
            if (user && valid_password) {
                return user;
            };
            return null;
        } catch (error) {
            throw new Error('Não foi possível encontrar o usuário.');
        };
    };

    async validPayloadUser(payload): Promise<any> {
        const valid_user_company = await this.usersRepository.findOne({
            where: { id: payload.user_id, company_id: payload.company_id }
        });
        if (!!valid_user_company) {
            return true;
        };
        return null;
    };


    async validPassUser(password: string, user_id: string, company_id: string): Promise<any> {
        try {
            const user = await this.usersRepository.findOne({ where: { id: user_id, company_id: company_id } });
            const valid_password = await bcrypt.compare(password, user.password);
            if (user && valid_password) {
                return user;
            };
            return null;
        } catch (error) {
            throw new Error('Não foi possível encontrar o usuário.')
        };
    };

    async createUser(user, status: string, company_id: string): Promise<any> {
        try {
            const user_exists = await this.userExists(user);
            if (user_exists) {
                throw new Error('Usuário com esse email já cadastrado.');
            };

            await this.accessService.findAccessGroup(user.access_group_id, company_id);

            const user_data = { ...user, status, company_id };
            const user_saved = await this.usersRepository.save(user_data);
            const token = await this.authService.createPassToken(user_saved.id, company_id);

            await sendCreatePasswordEmail(user_exists, token);

            return user;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createPass(password, auth): Promise<any> {
        try {
            const cript_password = await bcrypt.hash(password, 10);
            const user = await this.usersRepository.update({ id: auth.user_id, company_id: auth.company_id }, { password: cript_password });
            return user;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getUsers(): Promise<any> {
        try {
            const users = await this.usersRepository.find({
                select: ['first_name', 'last_name', 'email']
            });
            return users;
        } catch (error) {
            throw new Error('Usuários não foram encontrados!');
        };
    };

    async deleteUser(id: string): Promise<any> {
        try {
            await this.usersRepository.delete(id);
        } catch (error) {
            throw new Error('Usuário não foi deletado!');
        };
    };
};