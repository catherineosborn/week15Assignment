import React, { useState } from "react";

export default function UpdateForm({ user, updateUser}) {
    const MOCK_API_URL = 'https://6496b26383d4c69925a3054f.mockapi.io/user';

    const [name, setUpdatedName] = useState("")
    const [jobTitle, setUpdatedJobTitle] = useState("")
    const [companyName, setUpdatedCompanyName] = useState("")


    function handleUpdate(e) {
        e.preventDefault();

        console.log('Updating user with data: ', name, jobTitle, companyName);

        const updatedUser = {
            ...user,
            name: name,
            jobTitle: jobTitle,
            companyName: companyName,
        };

        console.log('Updating user:', updatedUser);

        fetch(`${MOCK_API_URL}/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            console.log('User updated: ', updatedUser);
            updateUser(updatedUser);

            setUpdatedName('');
            setUpdatedJobTitle('');
            setUpdatedCompanyName('');
        });
    }

    return (
        <form className='formBox'>
            <h3>Update User</h3>
            <div className='updateFormContainer'>
                <label>Update Name: </label>
                <input onChange={(e) => setUpdatedName(e.target.value)} value={name} /> <br />
                <label>Update Job Title: </label>
                <input onChange={(e) => setUpdatedJobTitle(e.target.value)} value={jobTitle} /><br />
                <label>Update Company Name: </label>
                <input onChange={(e) => setUpdatedCompanyName(e.target.value)} value={companyName} /><br />
                <button onClick={handleUpdate}>Update</button>
            </div>
        </form>
    );
}