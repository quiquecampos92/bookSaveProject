import React, { useState, useEffect } from "react";
import { GradientCard } from "../dataComponents/GradientCard.jsx";
import booksService from "../../services/books.js";

export function BooksToRead({ filteredBooks }) {
    const [booksToRead, setBooksToRead] = useState([]);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        try {
            const booksData = await booksService.getAllBooks();
            const unreadBooks = booksData.filter(book => book.read === false);
            setBooksToRead(unreadBooks);
        } catch (error) {
            if (error.response && error.response.status === 401) {
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

    const handleButton = async (book) => {
        try {
            const updatedBook = { ...book, read: true };
            await booksService.updateBook(book.id, updatedBook);

            setBooksToRead(prevBooks => prevBooks.filter(b => b.id !== book.id));
        } catch (error) {
            setError('Algo ha salido mal. No se ha podido marcar el libro como leído.');
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }

    return (
        <div className="flex flex-wrap gap-6 mx-4 mt-4 justify-center">
            {booksToRead.length === 0 ? (
                <p>No hay libros que quieras leer</p>
            ) : (
                booksToRead.map((book, index) => (
                    <GradientCard
                        key={index}
                        book={book}
                        handleButton={() => handleButton(book)}
                        error={error}
                    />
                ))
            )}
        </div>
    );
}
