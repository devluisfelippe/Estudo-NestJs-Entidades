import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { AccessService } from '../accessGroups/accessGroups.service';



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService,
        @Inject(forwardRef(() => AccessService)) private accessService: AccessService
    ) { };

    async validateLoginCredentials(user_email: string, user_password: string): Promise<any> {
        try {
            const user = await this.userRepository.findOne({ where: { email: user_email } });
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
        const valid_user_company = await this.userRepository.findOne({
            where: { id: payload.user_id, company_id: payload.company_id }
        });
        if (!!valid_user_company) {
            return true;
        };
        return null;
    };


    async validPassUser(password: string, user_id: string, company_id: string): Promise<any> {
        try {
            const user = await this.userRepository.findOne({ where: { id: user_id, company_id: company_id } });
            const valid_password = await bcrypt.compare(password, user.password);
            if (user && valid_password) {
                return user;
            };
            return null;
        } catch (error) {
            throw new Error('Não foi possível encontrar o usuário.')
        };
    };

    async emailExists(email: string): Promise<any> {
        try {
            const email_exists = await this.userRepository.findOne({
                where: { email: email }
            });

            if (!email_exists) {
                return null;
            };

            return email_exists;
        } catch (error) {
            throw new Error('Não foi possível encontrar o e-mail.')
        };
    };

    async createUser(user, status: string, company_id: string): Promise<any> {
        try {
            const email_exists = await this.emailExists(user.email);

            if (email_exists) {
                throw new Error('Email já existe.');
            };

            await this.accessService.findAccessGroup(user.access_group_id, company_id);

            const user_data = { ...user, status, company_id };
            const user_saved = await this.userRepository.save(user_data);
            const token = await this.authService.createPassToken(user_saved.id, company_id);
            console.log(token);
            return user;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createPass(password, auth): Promise<any> {
        try {
            const cript_password = await bcrypt.hash(password, 10);
            await this.userRepository.update({ id: auth.user_id, company_id: auth.company_id }, { password: cript_password, status: 'ACTIV' });
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createNewPass(password, auth): Promise<any> {
        try {
            const cript_password = await bcrypt.hash(password, 10);
            const user = await this.userRepository.update({ id: auth.user_id, company_id: auth.company_id }, { password: cript_password });
            return user;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getUsers(): Promise<any> {
        try {
            const users = await this.userRepository.find({
                select: ['first_name', 'last_name', 'email']
            });
            return users;
        } catch (error) {
            throw new Error('Usuários não foram encontrados!');
        };
    };

    async deleteUser(id: string): Promise<any> {
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            throw new Error('Usuário não foi deletado!');
        };
    };
};