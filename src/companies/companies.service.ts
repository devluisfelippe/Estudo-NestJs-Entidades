import { Injectable } from "@nestjs/common";
import { Company } from "./company.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../users/users.service";
import { AccessService } from "../accessGroups/accessGroups.service";


@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private readonly companyRepositoy: Repository<Company>,
        private userService: UserService,
        private accessService: AccessService
    ) { };

    async createUserAdmin(access_group_id: string, company_id: string): Promise<any> {
        try {
            const user_admin = {
                first_name: 'admin',
                last_name: '',
                email: 'admin@admin.com',
                password: 'useradmin2023',
                access_group_id: access_group_id
            };
            const status_user = 'ACTIV';
            await this.userService.createUser(user_admin, status_user, company_id);
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createAccessGroupAdmin(company_id: string): Promise<any> {
        try {
            const access_group_data = { name: 'ADMINS' };
            const access_group_admin = await this.accessService.createAccess(access_group_data, company_id);
            return access_group_admin;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createCompany(company): Promise<any> {
        try {
            const company_data = { ...company };
            const new_company = await this.companyRepositoy.save(company_data);
            const access_group = await this.createAccessGroupAdmin(new_company.id);
            await this.createUserAdmin( access_group.id, new_company.id);
            return company;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};