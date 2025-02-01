import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
enum UserRole {
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

    @Column({ type: 'enum', enum: UserRole, default: 'user' })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
