import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Table } from "../dataComponents/Table.jsx";
import bookService from "../../services/books.js";

export function ReadBooks() {
    const { user } = useContext(AuthContext);
    const [readBooks, setReadBooks] = useState([]);
    const [error, setError] = useState("");

    const columns = [
        { header: "Title", key: "title" },
        { header: "Author", key: "author" },
        { header: "Points", key: "points" },
        { header: "Review", key: "review" },
        { header: "Reading Date", key: "reading_Date" },
        { header: "Read", key: "read", format: (value) => (value ? "Yes" : "No") },
        { header: "Price", key: "price" },
        { header: "Owner", key: "owner" },
    ];

    const fetchBooks = async () => {
        try {
            const booksData = await bookService.getAllBooks();
            const readBooksData = booksData.filter(book => book.read === true);
            setReadBooks(readBooksData);
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

    const filter = (book) => book.read;

    return (
        <div>
            <Table userId={user.id} fetchBooks={fetchBooks} columns={columns} books={readBooks} error={error} />
        </div>
    );
}
