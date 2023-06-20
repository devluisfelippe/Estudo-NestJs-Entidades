import { Injectable } from "@nestjs/common";
import { Company } from "./company.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../users/users.service";


@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private readonly companyRepositoy: Repository<Company>,
        private userService: UserService
    ) { };

    async createUserAdmin(company_id: string): Promise<any> {
        try {
            const user_admin = {
                first_name: 'admin',
                last_name: '',
                email: 'admin@root.com',
                password: 'useradmin2023',
                status: 'ACTIV',
                access_group_id: '43fe61db-0e38-492b-b87c-777b1e880558'
            }
            await this.userService.createUser(user_admin, company_id);
        } catch (error) {
            throw new Error('Não foi possível criar usuário administrador.')
        };
    };

    async createCompany(company): Promise<any> {
        try {
            const company_data = { ...company };
            const new_company = await this.companyRepositoy.save(company_data);
            await this.createUserAdmin(new_company.id);
            return company;
        } catch (error) {
            throw new Error('Empresa não foi criada.');
        };
    };
}