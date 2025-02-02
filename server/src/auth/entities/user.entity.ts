import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
