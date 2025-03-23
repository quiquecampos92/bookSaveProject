import React, { useState } from 'react';
import usersService from '../../services/users';
import { AddButton } from '../buttons/AddButton';

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
            console.log("Updated owners:", updatedOwners);
            setSuccess('Owner added successfully');
            setError('');
            setOwnerName('');
        } catch (err) {
            setError('Error adding owner');
            setSuccess('');
            console.error("Error in handleSubmit:", err);
        }
    };


    return (
        <div className="bg-white shadow-md w-96 shadow-green-300 rounded-lg p-6">
            <h3 className="text-gray-700 text-2xl font-bold mb-4 text-center">Add Owner</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-15">
                <div className="flex flex-col gap-5">
                    <input
                        type="text"
                        id="ownerName"
                        value={ownerName}
                        placeholder="Enter new owner name"
                        onChange={(e) => setOwnerName(e.target.value)}
                        className="bg-green-100 border-b-2 border-green-500 placeholder-slate-500 focus:border-zinc-50 focus:outline-none p-1 h-9"
                    />
                </div>
                <AddButton type="submit" text="Add Owner" style="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 my-5 rounded" />
            </form>
            {error && <p className="text-red-500 mt-2" >{error}</p>}
            {success && <p className="text-green-500 mt-2" >{success}</p>}
        </div>
    );
};