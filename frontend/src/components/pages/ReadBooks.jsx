import React, { useState, useEffect } from "react";
import { Table } from "../dataComponents/Table.jsx";
import bookService from "../../services/books.js";

export function ReadBooks() {
    const [books, setBooks] = useState([]);
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

    const filter = (book) => book.read;

    return (
        <div>
            <Table columns={columns} filter={filter} books={books} error={error} />
        </div>
    );
}
