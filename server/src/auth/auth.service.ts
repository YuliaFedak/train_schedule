import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {RegisterDto} from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";
import {TokenDto} from "./dto/token.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}
    private readonly saltRounds = 10

    async register(registerDto: RegisterDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                email : registerDto.email,
            },
        })
        if(existUser) throw new  BadRequestException("This user already in use")
        const hashPassword = await bcrypt.hash(registerDto.password, this.saltRounds)
        const user = await this.userRepository.save({
            username: registerDto.username,
            email: registerDto.email,
            password: hashPassword
        })
        return this.generateToken({id: user.id, username: user.username, email: user.email, role: user.role})
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: {
                email: loginDto.email
            }
        })
        if (!user) {
            throw new UnauthorizedException('Not authorized user')
        }
        const passwordMatch = await bcrypt.compare(loginDto.password, user.password)
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid password')
        }
        return this.generateToken({id: user.id, username: user.username, email: user.email, role: user.role})
    }

    async authMe(token: string) {
        try {
            const decoded: any = this.jwtService.decode(token);
            if (!decoded) {
                throw new UnauthorizedException('Invalid token');
            }
            return decoded.tokenDto;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async generateToken(tokenDto: TokenDto) {
        const accessToken =  this.jwtService.sign({tokenDto}, {expiresIn: '1h'})
        return {"accessToken": accessToken}
    }

}
