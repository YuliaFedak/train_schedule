import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Schedule} from "./entities/schedule.entity";
import {Station} from "../station/entities/station.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Schedule, Station])],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
