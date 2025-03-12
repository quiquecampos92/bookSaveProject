import React, { useState, useEffect } from "react";
import bookService from "../../services/books.js";

export function Table({ columns, filter = null }) {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        try {
            const booksData = await bookService.getAllBooks();
            setBooks(booksData);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Si el token ha expirado, redirige al login
                localStorage.removeItem("loggedUser");
                localStorage.removeItem("loggedUserToken");
                window.location.href = "/login";
            } else {
                console.error("Error fetching books:", error);
                setError("Error fetching books");
            }
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="m-10 shadow-md">
            {error && <p className="text-red-500">{error}</p>}

            {books.length === 0 && !error ? (
                <p className="text-gray-500 text-center py-4">No books available</p>
            ) : (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-4 py-2 text-left font-bold text-gray-700 border-b border-gray-300">
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id || book.id} className={`hover:bg-gray-500 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} border-b dark:bg-gray-800 dark:border-gray-700`}>
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-2">
                                        {col.format ? col.format(book[col.key]) : book[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}