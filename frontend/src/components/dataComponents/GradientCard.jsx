import React from 'react'
import { AddButton } from "../buttons/AddButton.jsx";

export function GradientCard({ books, error }) {

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const handleAddButton = () => {

    }

    return (
        <div className="flex flex-wrap gap-6 mx-4 mt-4 justify-center">
            {!books || books.length === 0 ? (
                <p>No hay libros que quieras leer</p>
            ) : (
                books.map((book) => (
                    <div
                        key={book.id}
                        className="relative min-w-[300px] min-h-[264px] max-w-[300px] max-h-[264px] rounded-lg cursor-pointer border-2 border-orange-500 bg-gradient-to-b hover:bg-gradient-to-t from-green-100 hover:scale-110 shadow-xl hover:shadow-2xl transition-all duration-100"
                    // className="relative w-[200px] h-[264px] rounded-lg cursor-pointer border-2 border-orange-500 bg-green-100 bg-opacity-80 shadow-xl hover:shadow-2xl"
                    >
                        <div className="text-center mt-3">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-700">
                                {capitalize(book.title)}
                            </h5>
                        </div>
                        <div className="p-4 pt-2">
                            <p className="text-md font-medium text-orange-500 mb-4">
                                <span className="text-gray-500">Author:</span> {book.author}
                            </p>

                            <p className="text-md font-medium text-orange-500">
                                <span className="text-gray-500">Review:</span> {book.review || "No review available"}
                            </p>

                            <div className="flex items-center justify-center mt-4">
                                {/* <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                    Add to My Books
                                </button> */}
                                <AddButton handleAddButton={handleAddButton} text="Mark as reading" style="bg-orange-500 text-white px-4 py-2 rounded hover:text-gray-500 transition" type="text" />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};