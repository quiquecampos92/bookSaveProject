import React, { useState } from 'react'
import { Navbar } from "./Navbar";
import { Header } from "./Header";

export function Layout({ children }) {
    const [filteredBooks, setFilteredBooks] = useState(null);

    const handleSearch = (term) => {
        setFilteredBooks(term);
    }

    return (
        <>
            <Header onSearch={handleSearch} />
            <Navbar />
            <main >
                {React.cloneElement(children, { filteredBooks })}
            </main>
        </>
    )
}
