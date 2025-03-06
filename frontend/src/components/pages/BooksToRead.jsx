import React from "react";
import { Table } from "../dataComponents/Table.jsx";
import { Card } from "../dataComponents/Card.jsx";

export function BooksToRead() {
    const columns = [
        { header: "Title", key: "title" },
        { header: "Author", key: "author" },
    ];

    const filter = (book) => !book.read;

    return (
        <div>
            <Card columns={columns} filter={filter} />
        </div>
    );
}
