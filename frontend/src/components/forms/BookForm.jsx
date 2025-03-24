import React, { useState, useEffect } from 'react';
import { AddButton } from '../buttons/AddButton';
import booksService from "../../services/books";
import usersService from '../../services/users';



export function BookForm({ userId, setModalIsVisible, selectedBook, fetchBooks }) {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchUser = async () => {
        try {
            const userData = await usersService.getUser(userId);
            setUser(userData);
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const [formData, setFormData] = useState({
        title: selectedBook?.title || "",
        author: selectedBook?.author || "",
        points: selectedBook?.points || 1,
        review: selectedBook?.review || "",
        reading_Date: selectedBook?.reading_Date || "",
        owner: selectedBook?.owner || "",
        read: selectedBook?.read || false,
        price: selectedBook?.price || 0,
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
            setErrorMessage('Algo ha salido mal. No se ha podido registrar el libro');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };
    const handleDelete = async () => {
        try {
            await booksService.deleteBook(selectedBook.id);
            setModalIsVisible(false);
            fetchBooks();
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
        } catch (error) {
            setErrorMessage('Algo ha salido mal. No se ha podido eliminar el libro');
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

                <div className="col-span-2">
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
                    <label className="block text-white">Owner</label>
                    <select
                        id="ownerName"
                        name="owner"
                        value={formData.owner}
                        onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                        className="w-full h-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg text-green-600"
                    >

                        <option value="">Select an owner</option>
                        {user && user.bookOwners ? (
                            user.bookOwners.map(owner => (
                                <option key={owner} value={owner}>{owner}</option>
                            ))
                        ) : (
                            <option disabled>Loading owners...</option>
                        )}
                    </select>

                </div>

                <div>
                    <label className="block text-white">Reading Date</label>
                    <input
                        type="date"
                        name="reading_Date"
                        value={formData.reading_Date}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg text-green-600"
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


                <div className="col-span-2 flex items-center justify-between gap-8">
                    <AddButton handleAddButton={handleSubmit} text="Save book" style="bg-white border-2 border-orange-500 hover:bg-orange-500 transition text-orange-500 hover:text-white px-4 py-2 rounded w-full" type="submit" />
                    {selectedBook && (
                        <AddButton handleAddButton={handleDelete} text="Delete book" style="bg-white border-2 border-orange-500 hover:bg-orange-500 transition text-orange-500 hover:text-white px-4 py-2 rounded w-full" type="button" />
                    )}
                </div>
            </form>
        </div>
    );
}
