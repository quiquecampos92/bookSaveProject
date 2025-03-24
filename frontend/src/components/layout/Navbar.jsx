import React from "react";
import { Link, useLocation } from "react-router-dom";


export function Navbar() {
    const location = useLocation();

    const links = [
        { name: 'HOME', path: '/books' },
        { name: 'READ BOOKS', path: '/readbooks' },
        { name: 'BOOKS TO READ', path: '/bookstoread' },
        { name: 'MY BOOKS', path: '/mybooks' },
    ];

    return (
        <>
            <nav className="flex items-center justify-center pl-4 py-3 px-5">
                <div className="">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 text-md">
                        {links
                            .filter(link => link.name)
                            .map(link => {
                                return (
                                    <li key={link.name} className="transform hover:scale-110 transition-transform duration-300">
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
