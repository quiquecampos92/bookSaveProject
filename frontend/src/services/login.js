import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    try {
        const response = await axios.post(baseUrl, credentials)
        return response.data
    } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message);
        return null;
    }
}

export default { login }