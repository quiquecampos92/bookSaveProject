import React, { useState, useEffect } from "react";
import bookService from "../../services/books.js";

export function Card({ columns, filter }) {
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

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className="flex flex-wrap gap-6 mx-4 mt-4 justify-center">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow dark:bg-gray-800 dark:border-gray-700"
                >
                    <div className="flex items-center justify-center mt-3">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
                            {capitalize(book.title)}
                        </h5>
                    </div>
                    <div className="p-4 pt-2">
                        <p className="textmd font-medium text-gray-600 dark:text-gray-400 mb-4">
                            <span className="text-gray-500 dark:text-gray-200">Author:</span>{" "}
                            {book.author}
                        </p>

                        <p className="text-md font-medium text-gray-600 dark:text-gray-400">
                            <span className="text-gray-500 dark:text-gray-200">Review:</span>{" "}
                            {book.review || "No review available"}
                        </p>

                        <div className="flex items-center justify-center mt-4">
                            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600">
                                Add to My Books
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}
