import React, { useEffect, useState } from "react";
import UpdateForm from "./UpdateForm";

export default function User() {
    const MOCK_API_URL = 'https://6496b26383d4c69925a3054f.mockapi.io/user';

    const [users, setUsers] = useState([]);

    function getUsers() {
        fetch(MOCK_API_URL)
            .then(data => data.json())
            .then(data => setUsers(data));
    }

    useEffect(() => {
        console.log('User component mounted');
        getUsers();
    }, []);

    function deleteUser(id) {
        console.log('Deleting user: ', id);
        fetch(`${MOCK_API_URL}/${id}`, {
            method: 'DELETE'
        }).then(() => {
            console.log('User deleted: ', id);
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
        });
    }

    function updateUser(updatedUser) {
        const updatedUsers = users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
    }    

    return (
        <div>
            {users.map((user) => (
                <div className='userContainer' key={user.id}>
                    <div className='infoBox'>
                        <h3>User Info</h3>
                        Name: {user.name} <br />
                        Job Title: {user.jobTitle} <br />
                        Company Name: {user.companyName} <br />
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </div>
                    <UpdateForm
                        user={user}
                        updateUser={updateUser}
                    />
                </div>
            ))}
        </div>
    );
}