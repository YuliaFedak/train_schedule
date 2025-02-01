import {Schedule} from "../types/schedule";
import {instance} from "./index";

export const createSchedule = async (schedule: Schedule) => {
    const response = await instance.post('/api/schedule', schedule)
    return response.data
}

export const deleteSchedule = async (id: number) => {
    const response = await instance.delete(`/api/schedule/${id}`)
    return response
}

export const updateSchedule = async (id: number, schedule: Schedule) => {
    const response = await instance.patch(`/api/schedule/${id}`, schedule)
    return response
}
