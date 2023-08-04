import { useState } from "react";

export default function NewUserForm (){

    const [newUserName, setNewUserName] = useState('')
    const [newUserJobTitle, setNewUserJobTitle] = useState('')
     const [newUserCompanyName, setNewUserCompanyName] = useState('')

    function postNewUser(e){
        e.preventDefault()
  
        let data = {
        name: newUserName,
        jobTitle: newUserJobTitle,
        companyName: newUserCompanyName,
        }
  
        fetch(MOCK_API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        }).then(() => getUsers())
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