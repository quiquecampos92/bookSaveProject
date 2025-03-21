import React from 'react'
import { Navbar2 } from "./Navbar2";

export function Layout({ children }) {
    return (
        <>
            <Navbar2 />
            <main>
                {children}
            </main>
        </>
    )
}
