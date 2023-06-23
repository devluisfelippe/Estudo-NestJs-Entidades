import { InjectRepository } from "@nestjs/typeorm";
import { AccessGroup } from "./access.entity";
import { Repository } from "typeorm";


export class AccessService {
    constructor(
        @InjectRepository(AccessGroup) private readonly accessRepository: Repository<AccessGroup>
    ) { };

    async findAccessGroup(access_group_id: string, company_id: string): Promise<any> {
        try {
            const access_exists = await this.accessRepository.findOne({
                where: { id: access_group_id, company_id: company_id }
            });

            if (!access_exists) {
                throw new Error('Grupo de acesso não encontrado');
            };

            return true;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createAccess(access, company_id): Promise<any> {
        try {
            const access_data = { ...access, company_id };
            const access_saved = await this.accessRepository.save(access_data);
            return access_saved;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};