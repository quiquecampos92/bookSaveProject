import React from "react";
import { Table } from "../dataComponents/Table.jsx";

export function ReadBooks() {
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

    const filter = (book) => book.read;

    return (
        <div>
            <Table columns={columns} filter={filter} />
        </div>
    );
}
