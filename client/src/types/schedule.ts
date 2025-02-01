export interface Schedule {
    train: string;
    departureStation: number;
    arrivalStation: number;
    departureTime: string;
    arrivalTime: string;
    platform: number;
}

export interface Station {
    name: string
}
