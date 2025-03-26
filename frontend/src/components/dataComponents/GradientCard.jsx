import React from 'react'
import { AddButton } from "../buttons/AddButton.jsx";

export function GradientCard({ book, handleButton, error }) {

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className="relative w-full max-w-sm 2xl:max-w-lg rounded-lg border-2 border-green-500 bg-gradient-to-b hover:bg-gradient-to-t from-green-100 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-200 p-6">
            <div className="text-center">
                <h5 className="text-xl font-bold text-gray-700">
                    {capitalize(book.title)}
                </h5>
            </div>

            <div className="mt-3 space-y-2">
                <p className="text-md 2xl:text-xl font-medium text-orange-500">
                    <span className="text-gray-500 font-semibold">Autor:</span> {book.author}
                </p>

                <p className="text-md 2xl:text-xl font-medium text-orange-500">
                    <span className="text-gray-500 font-semibold">Reseña:</span> {book.review || "No review available"}
                </p>
            </div>

            <div className="flex justify-center mt-5">
                <AddButton
                    handleAddButton={handleButton}
                    text="Marcar como leído"
                    style="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                    type="text"
                />
            </div>
        </div>

    );
};
