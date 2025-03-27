import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext.jsx";
import { Table } from "../dataComponents/Table.jsx";
import { UserOwners } from "../dataComponents/UserOwners.jsx"
import { AddButton } from '../buttons/AddButton.jsx';
import bookService from "../../services/books.js";
import usersService from '../../services/users';
import { HiMiniUserPlus } from "react-icons/hi2";

export function SelectBooksByOwners({ filteredBooks }) {
    const { user } = useContext(AuthContext);
    const [fullUser, setFullUser] = useState(null);
    const [ownerName, setOwnerName] = useState('');
    const [defaultOwnerName, setDefaultOwnerName] = useState('');
    const [myBooks, setMyBooks] = useState([]);
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [error, setError] = useState("");

    const columns = [
        { header: "Title", key: "title" },
        { header: "Author", key: "author" },
        { header: "Points", key: "points" },
        { header: "Read", key: "read", format: (value) => (value ? "Yes" : "No") },
        { header: "Price", key: "price" }
    ];

    const fetchUser = async () => {
        try {
            const userData = await usersService.getUser(user.id);
            setFullUser(userData);
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    const fetchDefaultOwner = () => {
        setDefaultOwnerName(fullUser?.bookOwners[0]);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (fullUser?.bookOwners?.length > 0) {
            setOwnerName(fullUser.bookOwners[0]); // Establece el primer propietario como valor predeterminado
        }
    }, [fullUser]); // Se ejecuta cuando fullUser cambia


    const fetchBooks = async () => {
        try {
            if (filteredBooks) {
                setMyBooks(filteredBooks.filter(book => book.owner === ownerName));
                return;
            } else {
                const booksData = await bookService.getAllBooks();
                const myBooksData = booksData.filter(book => book.owner === ownerName);
                setMyBooks(myBooksData);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Si el token ha expirado, redirige al login
                localStorage.removeItem("loggedUser");
                localStorage.removeItem("loggedUserToken");
                window.location.href = "/login";
            } else {
                console.error("Error fetching books:", error);
                setError("Error fetching books");
            }
        }
    };



    useEffect(() => {
        fetchBooks();

    }, [filteredBooks, ownerName]);

    const handleAddButton = () => {
        setModalIsVisible(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ownerName) {
            setError('Owner name is required');
            return;
        }

        try {
            await usersService.deleteOwner(ownerName, user.id);
            setSuccess('Owner deleted successfully');
            setError('');
            setOwnerName('');
        } catch (err) {
            setError('Error deleting owner');
            console.error("Error in handleSubmit:", err);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mx-10 sm:mx-16 mt-4">
                <form onSubmit={handleSubmit}>
                    <div>
                        <select
                            id="ownerName"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            className={`border-2 rounded-md text-xl sm:text-sm text-center border-orange-500 hover:bg-orange-500 hover:text-white focus:outline-orange-500 pr-1 h-10 
                            ${ownerName ? "text-orange-500" : "text-slate-500"}`}>
                            <option value={defaultOwnerName}>Select an owner</option>
                            {fullUser?.bookOwners.map(owner => (
                                <option key={owner} value={owner}>{owner}</option>
                            ))}
                        </select>
                    </div>
                </form>
                <AddButton text="Manage Owners" handleAddButton={handleAddButton} icon={<HiMiniUserPlus size={20} />} style="bg-white border-2 border-orange-500 hover:bg-orange-500 transition text-orange-500 hover:text-white px-4 py-2 rounded w-auto" type="text" />
            </div>
            {modalIsVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                    onClick={() => setModalIsVisible(false)}
                >
                    <UserOwners user={user} />
                </div>
            )}

            <Table userId={user.id} fetchBooks={fetchBooks} columns={columns} books={myBooks} error={error} />
        </>
    );
}
