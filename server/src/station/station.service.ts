import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Station} from "./entities/station.entity";
import {Repository} from "typeorm";
import {CreateStationDto} from "./dto/create-station.dto";

@Injectable()
export class StationService {
    constructor(
        @InjectRepository(Station)
        private readonly stationRepository: Repository<Station>
    ) {}

    async create(createStationDto: CreateStationDto) {
        const station = await this.stationRepository.save({ name: createStationDto.name })
        return station
    }

    async getAll() {
        return await this.stationRepository.find()
    }

    async getOne(id: number) {
        return await this.stationRepository.findOne({
            where: {id: id}
        })
    }

    async update(id: number, createStationDto: CreateStationDto) {
        const station = await this.stationRepository.update(id, createStationDto)
        return station
    }

    async remove(id: number) {
        return await this.stationRepository.delete(id)
    }

    async getDeparturesAndArrivals(stationId: number) {
        const station = await this.stationRepository.findOne({
            where: { id: stationId },
            relations: [
                'departures',
                'departures.departureStation',
                'departures.arrivalStation',
                'arrivals',
                'arrivals.departureStation',
                'arrivals.arrivalStation'
            ],
        });

        if (!station) {
            throw new Error('Station not found');
        }

        return {
            departures: station.departures,
            arrivals: station.arrivals,
        };
    }
}
