import React from 'react'
import { AddButton } from "../buttons/AddButton.jsx";

export function GradientCard({ book, handleButton, error }) {

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className="relative min-w-[300px] min-h-[264px] max-w-[300px] max-h-[264px] rounded-lg cursor-pointer border-2 border-orange-500 bg-gradient-to-b hover:bg-gradient-to-t from-green-100 hover:scale-110 shadow-xl hover:shadow-2xl transition-all duration-100">
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
                    <AddButton
                        handleAddButton={handleButton}
                        text="Mark as reading"
                        style="bg-orange-500 text-white px-4 py-2 rounded hover:text-gray-500 transition"
                        type="text"
                    />
                </div>
            </div>
        </div>
    );
};
