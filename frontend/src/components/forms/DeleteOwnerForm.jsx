import React, { useEffect, useState } from 'react';
import usersService from '../../services/users';
import { AddButton } from '../buttons/AddButton';

export function DeleteOwnerForm({ userId }) {
    const [ownerName, setOwnerName] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchUser = async () => {
        try {
            const userData = await usersService.getUser(userId);
            setUser(userData);
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ownerName) {
            setError('Owner name is required');
            return;
        }

        try {
            const ownerDeleted = await usersService.deleteOwner(ownerName, userId);// esto esta para mirar si esta bien
            console.log('Owner deleted: ', ownerDeleted);

            setSuccess('Owner deleted successfully');
            setError('');
            setOwnerName('');
        } catch (err) {
            setError('Error deleting owner');
            setSuccess('');
            console.error("Error in handleSubmit:", err);
        }
    };

    return (
        <div className="bg-white shadow-md w-96 shadow-green-300 rounded-lg p-6">
            <h3 className="text-gray-700 text-2xl font-bold mb-4 text-center">Select Owner to delete</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-15">
                <div className="flex flex-col gap-5">
                    <select
                        id="ownerName"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className={`bg-green-100 border-b-2 border-green-500 focus:border-zinc-50 focus:outline-none p-1 h-9 
                            ${ownerName ? "text-black" : "text-slate-500"}`}
                    >
                        <option value="">Select an owner</option>
                        {user?.bookOwners.map(owner => (
                            <option key={owner.id} value={owner}>{owner}</option>
                        ))}
                    </select>
                </div>
                <AddButton type="submit" text="Delete Owner" style="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 my-5 rounded" />
            </form>
            {error && <p className="text-red-500 mt-2" >{error}</p>}
            {success && <p className="text-green-500 mt-2" >{success}</p>}
        </div>
    );
};
