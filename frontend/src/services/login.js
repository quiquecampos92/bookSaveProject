<<<<<<< HEAD
import axios from 'axios'
const baseUrl = '/login'
=======
import apiClient from './apiClient';  
>>>>>>> fae9d41 (fix baseUrl  in login-service)

const baseUrl = '/login';  
const login = async (credentials) => {
    try {
        const response = await apiClient.post(baseUrl, credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message);
        return null;
    }
}

export default { login };
