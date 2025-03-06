import React, { useState, useEffect } from "react";
import bookService from "../../services/books.js";

export function Table({ columns, filter }) {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const [selectedBookId, setSelectedBookId] = useState(null);

    useEffect(() => {
        bookService
            .getAllBooks()
            .then((response) => {
                let filteredBooks = response.data;
                if (filter) {
                    filteredBooks = filteredBooks.filter(filter);
                }
                setBooks(filteredBooks);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
                setError("Error fetching books");
            });
    }, [filter]);

    const toggleForm = (bookId) => {
        setSelectedBookId((prevId) => (prevId === bookId ? null : bookId));
    };

    return (
        <div className="m-10 shadow-md">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                scope="col"
                                className="px-4 py-2 text-left font-bold text-white-700 border-b border-gray-300"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr
                            key={book.id}
                            onClick={() => toggleForm(book.id)}
                            className={`hover:bg-gray-500 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
                                } border-b dark:bg-gray-800 dark:border-gray-700`}
                        >
                            {columns.map((col) => (
                                <td key={col.key} className="px-4 py-2">
                                    {col.format ? col.format(book[col.key]) : book[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
