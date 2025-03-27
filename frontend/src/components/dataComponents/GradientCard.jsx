import React from 'react'
import { AddButton } from "../buttons/AddButton.jsx";
import { HiBookmark } from "react-icons/hi2";

export function GradientCard({ book, handleButton, error }) {

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className="relative w-full max-w-sm rounded-lg border-2 border-green-500 bg-gradient-to-b hover:bg-gradient-to-t from-green-100 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-200 p-6 flex flex-col justify-start">

            {/* Título */}
            <div className="text-center mb-2">
                <h5 className="text-xl font-bold text-gray-700 truncate">
                    {capitalize(book.title)}
                </h5>
            </div>

            {/* Contenedor con scroll pegado al título */}
            <div className="h-[100px] overflow-y-auto">
                <p className="text-md 2xl:text-xl font-medium text-orange-500 break-words">
                    <span className="text-gray-500 font-semibold">Author:</span> {book.author}
                </p>

                <p className="text-md 2xl:text-xl font-medium text-orange-500 break-words">
                    <span className="text-gray-500 font-semibold">Review:</span> {book.review || "No review available"}
                </p>
            </div>

            {/* Botón */}
            <div className="flex justify-center  mt-5">
                <AddButton
                    handleAddButton={handleButton}
                    text="Mark as read"
                    style="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                    icon={<HiBookmark size={20} />}
                    type="text"
                />
            </div>
        </div>
    );
}
