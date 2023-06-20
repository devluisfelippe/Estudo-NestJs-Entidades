import { User } from "../users/user.entity";
import { Company } from "../companies/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('access_groups')
export class AccessGroup {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'character varying', length: 30, nullable: false })
    name: string;

    @OneToMany(type => User, user => user.access_group)
    users: User[];

    @Column()
    company_id: string;
    
    @ManyToOne(type => Company, company => company.access_groups)
    @JoinColumn([
        { name: "company_id", referencedColumnName: "id" }
    ])
    company: Company;
}