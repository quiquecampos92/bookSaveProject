import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { Table } from "../dataComponents/Table.jsx";
import { BookForm } from "../forms/BookForm.jsx";
import { AddButton } from "../buttons/AddButton.jsx";
import bookService from "../../services/books.js";

export function Home() {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
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

    const fetchBooks = async () => {
        try {
            const booksData = await bookService.getAllBooks();
            setBooks(booksData);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Si el token ha expirado, redirige al login
                localStorage.removeItem("loggedUser");
                localStorage.removeItem("loggedUserToken");
                window.location.href = "/login";
            } else {
                console.error("Error fetching books:", error);
                setError("Error fetching books");
            }
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

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
                        <BookForm userId={user.id} setModalIsVisible={setModalIsVisible} fetchBooks={fetchBooks} />
                    </div>
                </div>
            )}

            <Table columns={columns} modalIsVisible={modalIsVisible} books={books} error={error} />
        </div>
    );
}
