import React, { useState } from 'react'

export function MobileAccordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-2">
            <button
                className={`w-full text-left px-4 py-3 border-2 border-green-300 ${isOpen ? "bg-green-300" : ""} flex justify-between items-center`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h1 className="font-semibold text-gray-500">{title}</h1>
                <span className={`transform transition-transform ${isOpen ? "rotate-180 text-orange-500" : "rotate-0 text-orange-500"}`}>
                    ▼
                </span>
            </button>
            {isOpen && (
                <div className="p-4 bg-white border-t border-gray-300">
                    {children}
                </div>
            )}
        </div>
    );
}

