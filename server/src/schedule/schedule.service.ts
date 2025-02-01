import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Schedule} from "./entities/schedule.entity";
import {Repository} from "typeorm";
import {CreateScheduleDto} from "./dto/create-schedule.dto";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository:Repository<Schedule>
    ) {}

    async create(createScheduleDto: CreateScheduleDto) {
        const schedule = await this.scheduleRepository.save({
            train: createScheduleDto.train,
            departureStation: createScheduleDto.departureStation,
            arrivalStation: createScheduleDto.arrivalStation,
            departureTime: createScheduleDto.departureTime,
            arrivalTime: createScheduleDto.arrivalTime,
            platform: createScheduleDto.platform
        })
        return schedule
    }

    async remove(id: number) {
        return await this.scheduleRepository.delete(id)
    }

    async update(id: number, updateData: UpdateScheduleDto): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findOne({ where: { id } });

        if (!schedule) {
            throw new NotFoundException(`Schedule with ID ${id} not found`);
        }

        Object.assign(schedule, updateData);

        return this.scheduleRepository.save(schedule);
    }
}
