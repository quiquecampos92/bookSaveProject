import React, { useState } from 'react'

export function SearchTerm() {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleSearch = (e) => {
        e.preventDefault();
        //crear filtro en backend
    }
    return (
        <form onSubmit={handleSearch}>
            <input onChange={handleSearchTerm} type="text" id="searchTerm" placeholder="Search"
                className="w-full md:w-[450px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-black sm:text-sm" />
        </form>
    )
}
