import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Station} from "../../station/entities/station.entity";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    train: string;

    @ManyToOne(() => Station, (station) => station.departures)
    departureStation: Station;

    @ManyToOne(() => Station, (station) => station.arrivals)
    arrivalStation: Station;

    @Column()
    departureTime: Date;

    @Column()
    arrivalTime: Date;

    @Column()
    platform: number;
}
