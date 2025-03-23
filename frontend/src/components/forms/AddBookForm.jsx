import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { AddButton } from '../buttons/AddButton';
import booksService from "../../services/books";


export function AddBookForm({ setModalIsVisible, fetchBooks }) {
    const { user } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        points: 1,
        review: "",
        reading_Date: "",
        owner: "",
        read: false,
        price: 0,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value || "",
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Libro registrado:", formData);
            await booksService.createBook(formData)
            setFormData(
                {
                    title: "",
                    author: "",
                    points: 1,
                    review: "",
                    reading_Date: "",
                    owner: "",
                    read: false,
                    price: 0,
                }
            )
            setModalIsVisible(false)
            fetchBooks();
        }
        catch (error) {
            setErrorMessage('Algo ha salido mal.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-green-600 w-full py-5 px-8 rounded-lg shadow-md max-h-screen overflow-auto">
            <h2 className="text-2xl font-semibold text-white text-center">
                Save a book
            </h2>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                    <label className="block text-white">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg text-green-600"
                    />
                </div>

                <div>
                    <label className="block text-white">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg text-green-600"
                    />
                </div>

                <div>
                    <label className="block text-white">Points (1-5)</label>
                    <input
                        type="number"
                        name="points"
                        value={formData.points}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg text-green-600"
                    />
                </div>

                <div>
                    <label className="block text-white">Reading Date</label>
                    <input
                        type="date"
                        name="reading_Date"
                        value={formData.reading_Date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg text-green-600"
                    />
                </div>

                <div>
                    <label className="block text-white">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg text-green-600"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-white">Review</label>
                    <textarea
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        required
                        className="w-full h-24 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg text-green-600"
                    ></textarea>
                </div>

                <div className="col-span-2 flex items-center justify-between p-3">
                    <label htmlFor="read" className="text-white font-semibold">Have you read this book?</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="read"
                            id="read"
                            checked={formData.read}
                            onChange={handleChange}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                </div>


                <div className="col-span-2">
                    <AddButton handleAddButton={handleSubmit} text="Save book" style="bg-white border-2 border-orange-500 hover:bg-orange-500 transition text-orange-500 hover:text-white px-4 py-2 rounded w-full" type="submit" />
                </div>
            </form>
        </div>
    );
}
