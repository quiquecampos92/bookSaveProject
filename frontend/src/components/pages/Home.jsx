import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Table } from "../dataComponents/Table.jsx";
import { AddBookForm } from "../forms/AddBookForm.jsx";
import { AddButton } from "../buttons/AddButton.jsx";

export function Home() {
    const { user } = useContext(AuthContext);
    const [modalIsVisible, setModalIsVisible] = useState(false)

    const columns = [
        { header: "Title", key: "title" },
        { header: "Author", key: "author" },
        { header: "Review", key: "review" },
        { header: "Reading Date", key: "reading_Date" },
        { header: "Points", key: "points" },
        { header: "Read", key: "read", format: (value) => (value ? "Yes" : "No") },
        { header: "Price", key: "price" },
        { header: "Owner", key: "owner" },
    ];



    const handleAddButton = () => {
        setModalIsVisible(true)
    }

    return (
        <div>
            <div className="flex items-center justify-between mx-16 pt-4">
                <h1 className="text-3xl font-bold text-gray-500 drop-shadow-sm">
                    Hola {user.name}, <span className="text-orange-400">¡Bienvenido!</span>
                </h1>
                <AddButton handleAddButton={handleAddButton} text="Add new book" style="bg-white border-2 border-orange-500 hover:bg-orange-500 transition text-orange-500 hover:text-white px-4 py-2 rounded w-auto" type="text" />
            </div>
            {modalIsVisible && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                    onClick={() => setModalIsVisible(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <AddBookForm closeModal={() => setModalIsVisible(false)} />
                    </div>
                </div>
            )}

            <Table columns={columns} />
        </div>
    );
}
