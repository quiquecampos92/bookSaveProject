import apiClient from './apiClient';

const getUser = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user:", error.response?.data || error.message);
    }
};

const createUser = async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
};

const createOwner = async (ownerName, userId) => {

    try {
        const response = await apiClient.post(`/users/${userId}/owners`, { ownerName });
        return response.data;  // Esto devuelve la lista de owners del usuario actualizado.
    } catch (error) {
        console.error("Error creating owner:", error.response?.data || error.message);
    }
};

const deleteOwner = async (ownerName, userId) => {
    try {
        const response = await apiClient.delete(`/users/${userId}/owners/${ownerName}`);
        return response.data;  // Esto devuelve la lista de owners actualizada del usuario.
    } catch (error) {
        console.error("Error deleting owner:", error.response?.data || error.message);
    }
};


export default {
    getUser,
    createUser,
    createOwner,
    deleteOwner,
};