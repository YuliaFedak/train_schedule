export class UpdateScheduleDto {
    train: string;
    departureStationId: number;
    arrivalStationId: number;
    departureTime: string;
    arrivalTime: string;
    platform: number;
}
