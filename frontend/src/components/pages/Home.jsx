import React from "react";
import { Table } from "../dataComponents/Table.jsx";
import { AddBookForm } from "../forms/AddBookForm.jsx";

export function Home() {
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

    return (
        <div>
            <AddBookForm />
            <Table columns={columns} />
        </div>
    );
}
