import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([User]), UserModule, JwtModule],
    providers: [AuthService],
    controllers: [AuthController]})
export class AuthModule {}
