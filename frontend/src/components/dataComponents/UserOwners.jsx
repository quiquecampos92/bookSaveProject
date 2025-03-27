import React from 'react';
import { AddOwnerForm } from '../forms/AddOwnerForm';
import { DeleteOwnerForm } from '../forms/DeleteOwnerForm';

export function UserOwners({ user }) {
    const userId = user.id;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div onClick={(e) => e.stopPropagation()} className="flex flex-row items-center justify-center md:justify-evenly gap-16 w-full flex-wrap">
                <AddOwnerForm userId={user.id} />
                <DeleteOwnerForm userId={user.id} />
            </div>
        </div>
    );
};
