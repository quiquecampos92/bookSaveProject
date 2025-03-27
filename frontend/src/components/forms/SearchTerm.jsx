import React, { useState, useEffect } from 'react'
import bookService from "../../services/books.js";

export function SearchTerm({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }


    useEffect(() => {
        const handleSearch = async () => {
            try {
                if (searchTerm === "") {
                    onSearch(null);
                    return;
                }
                const filteredBooks = await bookService.getFilteredBooks(searchTerm);
                onSearch(filteredBooks);
            } catch (error) {
                console.log(error);
            }
        };
        handleSearch();
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} >
            <input
                onChange={handleSearchTerm}
                id="searchTerm"
                type="text"
                placeholder="Search"
                className="w-auto sm:w-full md:w-[80vh] px-3 py-2 border bg-green-50 border-green-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 sm:text-sm" />
        </form >
    )
}
