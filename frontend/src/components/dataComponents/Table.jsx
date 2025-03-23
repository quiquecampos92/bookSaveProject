import React, { useState, useEffect } from "react";

export function Table({ columns, filter, modalIsVisible, books, error }) {

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
                <div className="alert alert-info shadow-lg">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="stroke-info flex-shrink-0 w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <span>No books available</span>
                    </div>
                </div>
            )}

            {/* Tabla */}
            {books.length > 0 && (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-green-300 uppercase">
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
                                className={`bg-white hover:bg-green-50 border-b"
                                    }`}
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
            )}
        </div>
    );
}