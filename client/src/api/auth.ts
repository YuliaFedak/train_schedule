import {Login, Register} from "../types/auth";
import {instance} from "./index";

export const login = async (loginTypes: Login) => {
    try {
        const response = await instance.post('/api/auth/login', loginTypes)
        localStorage.setItem('auth_token', response.data.accessToken);
        return response.data.accessToken;
    } catch (error: any) {
        if (error.response) {
            console.error('Error in login request:', error.response.data);
        } else {
            console.error('Error in login request:', error.message);
        }
        throw error;
    }
}

export const register = async (registerType: Register) => {
    try {
        const response = await instance.post('/api/auth/register', registerType);
        localStorage.setItem('auth_token', response.data.accessToken);
        return response.data.accessToken;

    } catch (error: any) {
        if (error.response) {
            console.error('Error in registration request:', error.response.data);
        } else {
            console.error('Error in registration request:', error.message);
        }
        throw error;
    }
}

export const getUserData = async (token: string) => {
    try {
        const response = await instance.post('api/auth/authMe', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};
