import React, { useState } from 'react'
import bookService from "../../services/books";


export function AddBookForm() {
    const [book, setBook] = useState({ title: "", author: "", points: "", review: "", reading_Date: "", owner: "", read: "", price: "", userId: "" });

    const handleChange = (e) => {
        setBook({ ...books, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookData = await bookService.post(book);
            navigate("/books");
        } catch (error) {
            console.error("Add book failed", error);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-4">Add a book</h2>
                    <label htmlFor=""></label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={book.username}
                        onChange={handleChange}
                        className="block border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={book.password}
                        onChange={handleChange}
                        className="block border p-2 w-full mb-2"
                    />
                    <input
                        type="number"
                        name="points"
                        placeholder="Points"
                        value={book.password}
                        onChange={handleChange}
                        className="block border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="review"
                        placeholder="Review"
                        value={book.password}
                        onChange={handleChange}
                        className="block border p-2 w-full mb-2"
                    />
                    <input
                        type="date"
                        name="reading_Date"
                        placeholder="Reading date"
                        value={book.password}
                        onChange={handleChange}
                        className="block border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="owner"
                        placeholder="Owner"
                        value={book.password}
                        onChange={handleChange}
                        className="block border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="read"
                        placeholder="Read"
                        value={book.password}
                        onChange={handleChange}
                        className="block border p-2 w-full mb-2"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={book.password}
                        onChange={handleChange}
                        className="block border p-2 w-full mb-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add book
                    </button>
                </form>
            </div>
        </>
    )
}
