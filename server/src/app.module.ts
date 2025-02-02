import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './auth/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {JwtModule} from "@nestjs/jwt";
import {Schedule} from "./schedule/entities/schedule.entity";
import {Station} from "./station/entities/station.entity";
import { StationModule } from './station/station.module';
import { ScheduleModule } from './schedule/schedule.module';



@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('SECRET_KEY'),
                signOptions: { expiresIn: '1h' },
            })
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                url: process.env.DB_URL,
                ssl: {
                    rejectUnauthorized: false,
                },
                // host: configService.get('DB_HOST'),
                // port: configService.get('DB_PORT'),
                // password: configService.get('DB_PASSWORD'),
                // username: configService.get('DB_USERNAME'),
                // database: 'train_schedule',
                entities: [User, Schedule, Station],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule,
        StationModule,
        ScheduleModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService],
})
export class AppModule {}
