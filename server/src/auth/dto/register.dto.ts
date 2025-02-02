import {UserRole} from "../entities/user.entity";

export class RegisterDto {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
}
