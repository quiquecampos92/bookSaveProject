import React, { useState } from 'react';
// import createOwner from '../../services/users';
import usersService from '../../services/users'; // Verifica la ruta

export function AddOwnerForm({ userId }) {
    const [ownerName, setOwnerName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ownerName) {
            setError('Owner name is required');
            return;
        }

        try {
            const updatedOwners = await usersService.createOwner(ownerName, userId);
            console.log("Updated owners:", updatedOwners);  // ✅ Verifica que devuelve algo
            setSuccess('Owner added successfully');
            setError('');
            setOwnerName('');
        } catch (err) {
            setError('Error adding owner');
            setSuccess('');
            console.error("Error in handleSubmit:", err); // ✅ Muestra el error en consola
        }
    };


    return (
        <div>
            <h3>Add Owner</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="ownerName">Owner Name</label>
                    <input
                        type="text"
                        id="ownerName"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                    />
                </div>
                <button type="submit">Add Owner</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};
