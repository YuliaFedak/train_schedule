import {Station} from "../../station/entities/station.entity";

export class CreateScheduleDto {
    train: string;
    departureStation: Station;
    arrivalStation: Station;
    departureTime: Date;
    arrivalTime: Date;
    platform: number
}
