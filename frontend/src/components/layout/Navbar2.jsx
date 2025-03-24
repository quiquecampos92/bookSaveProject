import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchTerm } from '../forms/SearchTerm.jsx';
import fullLogo from '../../assets/booksavewhiterow.png';
import { LogoutButton } from "../buttons/LogoutButton.jsx";
import { AuthContext } from "../../AuthContext.jsx";

export function Navbar2({ onSearch }) {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    const links = [
        { name: 'HOME', path: '/books' },
        { name: 'READ BOOKS', path: '/readbooks' },
        { name: 'BOOKS TO READ', path: '/bookstoread' },
        { name: 'MY BOOKS', path: '/mybooks' },
    ];

    return (
        <>
            <nav className="bg-gradient-to-b from-green-600 to-green-0 px-5">
                <div className={`flex justify-between items-center p-4`}>
                    <Link to="/books">
                        <img src={fullLogo} alt="logo booksave" className="w-32" />
                    </Link>
                    <SearchTerm onSearch={onSearch} />
                    <LogoutButton logout={logout} />
                </div>

                <div className="flex items-center justify-start max-w-screen-xl pl-4 py-3">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 text-md">
                        {links
                            .filter(link => link.name)
                            .map(link => {
                                return (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className={`hover:text-orange-500 pb-2 ${location.pathname === link.path ? "text-orange-500 font-bold border-b-2 border-orange-500 transition-colors duration-500" : "text-gray-500 transition-colors duration-300"}`}
                                        >
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </nav >
        </>
    );
}
