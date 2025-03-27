import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { HiBookmark } from "react-icons/hi2";
import { HiBookmarkSlash } from "react-icons/hi2";
import { HiMiniUsers } from "react-icons/hi2";

export function Navbar() {
    const location = useLocation();

    const links = [
        { name: 'HOME', path: '/books', icon: HiHome },
        { name: 'READ BOOKS', path: '/readbooks', icon: HiBookmark },
        { name: 'BOOKS TO READ', path: '/bookstoread', icon: HiBookmarkSlash },
        { name: 'BOOKS BY OWNERS', path: '/selectbooksbyowners', icon: HiMiniUsers },
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
                                            className={`flex flex-row items-center gap-1 hover:text-orange-500 ${location.pathname === link.path ? "text-orange-500 font-bold border-b-2 border-orange-500 transition-colors duration-500" : "text-gray-500 transition-colors duration-300"}`}
                                        >
                                            <link.icon className="inline-block w-8 h-8 sm:w-5 sm:h-5" />
                                            <span className="sm:block hidden">{link.name}</span>
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
