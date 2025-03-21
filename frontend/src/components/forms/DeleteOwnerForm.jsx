import React, { useState } from 'react';
import deleteOwner from '../../services/users';  // Asumiendo que tienes este archivo de servicios

export function DeleteOwnerForm({ userId }) {
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
            // Llamar al servicio para eliminar un owner
            const updatedOwners = await deleteOwner(ownerName, userId);
            setSuccess('Owner deleted successfully');
            setError('');
            setOwnerName('');  // Limpiar el campo del formulario
        } catch (err) {
            setError('Error deleting owner');
            setSuccess('');
        }
    };

    return (
        <div>
            <h3>Delete Owner</h3>
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
                <button type="submit">Delete Owner</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};
