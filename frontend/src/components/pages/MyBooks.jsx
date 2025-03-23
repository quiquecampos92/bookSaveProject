import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { Table } from "../dataComponents/Table.jsx";
import { UserOwners } from "../dataComponents/UserOwners.jsx"
import { AddButton } from '../buttons/AddButton';
import bookService from "../../services/books.js";

export function MyBooks() {
    const { user } = useContext(AuthContext);
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");

    const columns = [
        { header: "Title", key: "title" },
        { header: "Author", key: "author" },
        { header: "Points", key: "points" },
        { header: "Read", key: "read", format: (value) => (value ? "Yes" : "No") },
        { header: "Price", key: "price" }
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

    const filter = (book) => book.owner?.toLowerCase() === 'quique';

    const handleAddButton = () => {
        setModalIsVisible(true)
    }

    return (
        <>
            <div className="flex items-center justify-end mx-16 pt-4">
                <AddButton text="Manage Owners" handleAddButton={handleAddButton} style="bg-white border-2 border-orange-500 hover:bg-orange-500 transition text-orange-500 hover:text-white px-4 py-2 rounded w-auto" type="text" />
            </div>
            {modalIsVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                    onClick={() => setModalIsVisible(false)}
                >
                    <UserOwners user={user} />
                </div>
            )}

            <Table columns={columns} filter={filter} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible} books={books} error={error} />
        </>
    );
}
