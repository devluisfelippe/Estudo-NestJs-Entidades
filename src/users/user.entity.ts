import { AccessGroup } from "../accessGroups/access.entity";
import { Company } from "../companies/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', type: 'character varying', length: 100, nullable: false })
    first_name: string;

    @Column({ name: 'last_name', type: 'character varying', length: 100, nullable: false })
    last_name: string;

    @Column({ name: 'email', type: 'character varying', length: 70, nullable: false })
    email: string;

    @Column({ name: 'password', type: 'character varying', nullable: true })
    password: string;

    @Column({ name: 'status', type: 'character varying', nullable: false })
    status: string;

    @Column()
    access_group_id: string;
    
    @ManyToOne(type => AccessGroup, accessGroup => accessGroup.users)
    @JoinColumn([
        { name: "access_group_id", referencedColumnName: "id" }
    ])
    access_group: AccessGroup;

    @Column()
    company_id: string;
    
    @ManyToOne(type => Company, company => company.users)
    @JoinColumn([
        { name: "company_id", referencedColumnName: "id" }
    ])
    company: Company;
}