import {instance} from "./index";
import {Station} from "../types/schedule";

export const getAll = async () => {
    try {
        const response = await instance.get('/api/station')
        return response.data
    } catch (e) {
        console.error('Error in get station request:', e.response.data);
    }
}

export const getDeparturesAndArrivals = async (id: number) => {
    try {
        const response = await instance.get(`/api/station/train/${id}`)
        return response.data;
    }catch (e) {
        console.error('Error in get station request:', e.response.data);
    }
}

export const createStation = async (station: Station) => {
    try {
        const response = await instance.post(`/api/station`, station)
        return response.data;
    }catch (e) {
        console.error('Error in get station request:', e.response.data);
    }
}
