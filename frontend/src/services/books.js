import apiClient from './apiClient';

const getAllBooks = async () => {
    const response = await apiClient.get('/books');
    return response.data;
};

const createBook = async (newBook) => {
    const response = await apiClient.post('/books', newBook);
    return response.data;
};

const updateBook = async (id, modifiedBook) => {
    const response = await apiClient.put(`/books/${id}`, modifiedBook);
    return response.data;
};

const deleteBook = async (id) => {
    await apiClient.delete(`/books/${id}`);
};

export default {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
};