import React, { useState } from 'react'
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }) {
    const [filteredBooks, setFilteredBooks] = useState(null);

    const handleSearch = (term) => {
        setFilteredBooks(term);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky bg-white bg-opacity-80 top-0 z-50">
                <Header onSearch={handleSearch} />
                <Navbar />
            </div>
            <main className="flex-1">
                {React.cloneElement(children, { filteredBooks })}
            </main>
            <Footer />
        </div>

    )
}
