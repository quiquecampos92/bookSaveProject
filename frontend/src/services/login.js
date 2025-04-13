import apiClient from './apiClient';  

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
