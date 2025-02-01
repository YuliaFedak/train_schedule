import {Body, Controller, Delete, Param, Patch, Post} from '@nestjs/common';
import {ScheduleService} from "./schedule.service";
import {CreateScheduleDto} from "./dto/create-schedule.dto";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}
    @Post()
    async create(@Body() createScheduleDto :CreateScheduleDto) {
        return this.scheduleService.create(createScheduleDto)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.scheduleService.remove(id)
    }

    @Patch(':id')
    async updateSchedule(
        @Param('id') id: number,
        @Body() updateData: UpdateScheduleDto,) {
        return this.scheduleService.update(id, updateData);
    }
}
