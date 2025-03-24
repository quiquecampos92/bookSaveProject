import React, { useState } from 'react'
import { Navbar2 } from "./Navbar2";

export function Layout({ children }) {
    const [filteredBooks, setFilteredBooks] = useState(null);

    const handleSearch = (term) => {
        setFilteredBooks(term);
    }

    return (
        <>
            <Navbar2 onSearch={handleSearch} />
            <main >
                {React.cloneElement(children, { filteredBooks })}
            </main>
        </>
    )
}
