import React from 'react';
import { AddOwnerForm } from '../forms/AddOwnerForm';
import { DeleteOwnerForm } from '../forms/DeleteOwnerForm';

export function UserOwners({ user }) {

    return (
        <div>
            <h2>Manage Owners for {user.name} {user.lastName}</h2>
            <br /><br />
            <AddOwnerForm userId={user.id} />
            <br /><br /><br /><br />
            <DeleteOwnerForm userId={user.id} />
        </div>
    );
};
