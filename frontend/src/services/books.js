import axios from 'axios'

const basedUrl = '/api/books'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAllBooks = () => {
    return axios.get(basedUrl)
}

const createBook = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(basedUrl, newObject, config)
    return response.data
}

const updateBook = (id, modifiedBook) => {
    return axios.put(`${basedUrl}/${id}`, modifiedBook)
}

const deleteBook = (id) => {
    console.log('Book eliminado');
    return axios.delete(`${basedUrl}/${id}`)
}

export default {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    setToken
}