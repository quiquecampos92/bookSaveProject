import apiClient from './apiClient';

const getAllBooks = async () => {
    const response = await apiClient.get('/books');
    return response.data;
};

const getFilteredBooks = async (searchTerm) => {
    try {
        const response = await apiClient.get(`/books/search/${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        return [];
    }
};


const createBook = async (newBook) => {
    const response = await apiClient.post('/books', newBook);
    return response.data;
};

const updateBook = async (id, modifiedBook) => {
    try {
        const response = await apiClient.put(`/books/${id}`, modifiedBook);
        return response.data;
    } catch (error) {
        console.error("Error actualizando el libro:", error);
        return [];
    }
};

const deleteBook = async (id) => {
    await apiClient.delete(`/books/${id}`);
};

export default {
    getAllBooks,
    getFilteredBooks,
    createBook,
    updateBook,
    deleteBook,
};