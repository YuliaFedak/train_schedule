import {Body, Controller, Post, Headers, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post('authMe')
    async authMe(@Headers('authorization') authorization: string) {
        if (!authorization) {
            throw new UnauthorizedException('Token is missing');
        }
        const token = authorization.replace('Bearer ', '');
        try {
            const userData = await this.authService.authMe(token);
            return userData;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
