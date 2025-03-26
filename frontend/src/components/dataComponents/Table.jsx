import React, { useState } from "react";
import { BookForm } from "../forms/BookForm";

export function Table({ userId, fetchBooks, filteredBooks, columns, modalIsVisible, books, error }) {
    const [openBook, setOpenBook] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setOpenBook(true);
    };

    return (
        <div className={`relative overflow-x-auto shadow-md sm:rounded-lg m-10 ${modalIsVisible ? 'blur-sm' : ''}`}>
            {/* Mensaje de error */}
            {error && (
                <div className="alert alert-error shadow-lg mb-4">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {/* Mensaje si no hay libros */}
            {books.length === 0 && !error && (
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-500">No books available yet.</h1>
                </div>
            )}
            {filteredBooks ?
                filteredBooks.length > 0 && (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-sm 2xl:text-lg text-green-300 uppercase">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} scope="col" className="px-6 py-3">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book, index) => (
                                <tr
                                    key={book._id || book.id}
                                    onClick={() => handleBookClick(book)}
                                    className={`bg-white cursor-pointer hover:bg-green-50 border-b`}
                                >
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-6 py-4">
                                            {col.format ? col.format(book[col.key]) : book[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                :

                books.length > 0 && (
                    <table className="w-full text-left rtl:text-right text-gray-500 ">
                        <thead className="text-sm 2xl:text-lg text-green-300 uppercase">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} scope="col" className="px-6 py-3">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr
                                    key={book._id || book.id}
                                    onClick={() => handleBookClick(book)}
                                    className={`bg-white cursor-pointer hover:bg-green-50 border-b`}
                                >
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-6 text-sm py-4">
                                            {col.format ? col.format(book[col.key]) : book[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }


            {openBook && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                    onClick={() => setOpenBook(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <BookForm userId={userId} setModalIsVisible={setOpenBook} fetchBooks={fetchBooks} selectedBook={selectedBook} />
                    </div>
                </div>
            )}
        </div>
    );
}