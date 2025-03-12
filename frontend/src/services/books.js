import apiClient from './apiClient'; // Importa el cliente Axios configurado con interceptores

const getAllBooks = async () => {
    const response = await apiClient.get('/books'); // Usa el cliente Axios configurado
    return response.data;
};

const createBook = async (newObject) => {
    const response = await apiClient.post('/books', newObject); // Usa el cliente Axios configurado
    return response.data;
};

const updateBook = async (id, modifiedBook) => {
    const response = await apiClient.put(`/books/${id}`, modifiedBook); // Usa el cliente Axios configurado
    return response.data;
};

const deleteBook = async (id) => {
    await apiClient.delete(`/books/${id}`); // Usa el cliente Axios configurado
};

export default {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
};