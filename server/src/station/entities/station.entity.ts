import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Schedule} from "../../schedule/entities/schedule.entity";

@Entity()
export class Station {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    name: string;

    @OneToMany(() => Schedule, (schedule) => schedule.departureStation)
    departures: Schedule[];

    @OneToMany(() => Schedule, (schedule) => schedule.arrivalStation)
    arrivals: Schedule[];
}
