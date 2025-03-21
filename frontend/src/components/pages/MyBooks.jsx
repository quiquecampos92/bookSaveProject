import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Table } from "../dataComponents/Table.jsx";
import { UserOwners } from "../dataComponents/UserOwners.jsx"

export function MyBooks() {
    const { user } = useContext(AuthContext);

    const columns = [
        { header: "Title", key: "title" },
        { header: "Author", key: "author" },
        { header: "Points", key: "points" },
        { header: "Read", key: "read", format: (value) => (value ? "Yes" : "No") },
        { header: "Price", key: "price" }
    ];

    const filter = (book) => book.owner?.toLowerCase() === 'quique';

    return (
        <>
            <div>
                <UserOwners user={user} />
            </div>
            <div>
                <Table columns={columns} filter={filter} />
            </div>
        </>
    );
}
