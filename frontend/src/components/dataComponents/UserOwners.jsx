import React from 'react';
import { AddOwnerForm } from '../forms/AddOwnerForm';
import { DeleteOwnerForm } from '../forms/DeleteOwnerForm';

export function UserOwners({ user }) {
    const userId = user.id;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col md:flex-row items-center md:justify-evenly gap-16 w-full max-w-4xl flex-wrap">
                <AddOwnerForm userId={user.id} />
                <DeleteOwnerForm userId={user.id} />
            </div>
        </div>
    );
};
