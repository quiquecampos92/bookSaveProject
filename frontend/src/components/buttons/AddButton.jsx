import React from 'react'

export function AddButton({ handleAddButton, text, style, type }) {
    return (
        <button type={type || "text"} onClick={handleAddButton} className={`${style}`} >
            {text}
        </button>
    )
}

