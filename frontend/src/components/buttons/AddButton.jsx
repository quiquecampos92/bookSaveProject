import React from 'react'

export function AddButton({ handleAddButton, text, style, icon, type }) {
    return (
        <button type={type || "text"} onClick={handleAddButton} className={`${style} flex items-center gap-2`} >
            {icon}
            <span className='hidden sm:block'>
                {text}
            </span>
        </button>
    )
}

