import { useState } from "react";

export default function NewUserForm (){

    const MOCK_API_URL = 'https://6496b26383d4c69925a3054f.mockapi.io/user'

    const [newUserName, setNewUserName] = useState('')
    const [newUserJobTitle, setNewUserJobTitle] = useState('')
    const [newUserCompanyName, setNewUserCompanyName] = useState('')

    function postNewUser(e){
        e.preventDefault()
        console.log("Submitting new user...");
  
        let data = {
        name: newUserName,
        jobTitle: newUserJobTitle,
        companyName: newUserCompanyName,
        }
  
        console.log("Data: ", data);

        fetch(MOCK_API_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data);
            setNewUserName('');
            setNewUserJobTitle('');
            setNewUserCompanyName('');
        })
        .catch(error => {
            console.error("Error:", error);
        });    
    }

    return (
        <div className="App">

        <form className='newUserBox'>
            <h3>New User:</h3>
            <label>Name: </label>
            <input onChange={(e) => setNewUserName(e.target.value)}></input><br></br>
            <label>Job Title: </label>
            <input onChange={(e) => setNewUserJobTitle(e.target.value)}></input><br></br>
            <label>Company Name: </label>
            <input onChange={(e) => setNewUserCompanyName(e.target.value)}></input><br></br>
            <button onClick={(e) => postNewUser(e)}>Submit</button>
        </form>
    </div>)
}