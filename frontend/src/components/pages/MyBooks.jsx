import React from "react";
import { Table } from "../dataComponents/Table.jsx";

export function MyBooks() {
    const columns = [
        { header: "Title", key: "title" },
        { header: "Author", key: "author" },
        { header: "Points", key: "points" },
        { header: "Read", key: "read", format: (value) => (value ? "Yes" : "No") },
        { header: "Price", key: "price" }
    ];

    const filter = (book) => book.owner?.toLowerCase() === 'quique';

    return (
        <div>
            <Table columns={columns} filter={filter} />
        </div>
    );
}
