import React, { useState, useEffect } from "react";
import { Card } from "../dataComponents/Card.jsx";
import bookService from "../../services/books.js";


export function BooksToRead() {
    const [booksToRead, setBooksToRead] = useState([]);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        try {
            const booksData = await bookService.getAllBooks();
            const unreadBooks = booksData.filter(book => book.read === false); // Filtra solo los no leídos
            setBooksToRead(unreadBooks);
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

    return (
        <div>
            <Card books={booksToRead} error={error} />
        </div>
    );
}
