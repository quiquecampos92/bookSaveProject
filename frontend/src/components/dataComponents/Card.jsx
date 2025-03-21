import React from "react";

export function Card({ books, error }) {

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className="flex flex-wrap gap-6 mx-4 mt-4 justify-center">
            {!books || books.length === 0 ? (
                <p>No hay libros que quieras leer</p>
            ) : (
                books.map((book) => (
                    <div
                        key={book.id}
                        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                    >
                        <div className="flex items-center justify-center mt-3">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                                {capitalize(book.title)}
                            </h5>
                        </div>
                        <div className="p-4 pt-2">
                            <p className="text-md font-medium text-gray-600 mb-4">
                                <span className="text-gray-500">Author:</span> {book.author}
                            </p>

                            <p className="text-md font-medium text-gray-600">
                                <span className="text-gray-500">Review:</span> {book.review || "No review available"}
                            </p>

                            <div className="flex items-center justify-center mt-4">
                                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                    Add to My Books
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
