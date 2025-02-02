import axios from "axios";

export const instance = axios.create({
    baseURL: "https://train-schedule-1.onrender.com"
})
