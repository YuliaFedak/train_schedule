import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {StationService} from "./station.service";
import {CreateStationDto} from "./dto/create-station.dto";

@Controller('station')
export class StationController {
    constructor(private readonly stationService: StationService) {}

    @Post()
    async create(@Body() createStationDto: CreateStationDto) {
        return this.stationService.create(createStationDto)
    }

    @Get()
    async getAll() {
        return this.stationService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.stationService.getOne(id)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() createStationDto: CreateStationDto) {
        return await this.stationService.update(id, createStationDto)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.stationService.remove(id)
    }

    @Get('train/:id')
    async getDeparturesAndArrivals(@Param('id') id: number) {
    return this.stationService.getDeparturesAndArrivals(id)
}
}
