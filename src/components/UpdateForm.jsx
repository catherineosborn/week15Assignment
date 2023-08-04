import { useState } from "react"


export default function UpdateForm() {

    const [users, setUsers] = useState([{
        name: 'Catherine',
        jobTitle: 'Ministry Assistant',
        companyName: 'Calvary Christian Church'
      }])

    const [updatedName, setUpdatedName] = useState('')
    const [updatedJobTitle, setUpdatedJobTitle] = useState('')
    const [updatedCompanyName, setUpdatedCompanyName] = useState('')

    function updateUser(e, userObject){
        e.preventDefault()
  
        let updatedUserObject = {
        ...userObject,
        name: updatedName,
        jobTitle: updatedJobTitle,
        companyName: updatedCompanyName,
        }
  
        fetch(`${MOCK_API_URL}/${userObject.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedUserObject),
        headers: {
            "Content-Type": "application/json"
        }
        }).then(() => getUsers())
    }


    return(
        <form className='formBox'>
        <h3>Update User</h3>
        <div className='updateFormContainer'>
        <label>Update Name: </label>
        <input onChange={(e) => setUpdatedName(e.target.value)}></input> <br></br>
        <label>Update Job Title: </label>
        <input onChange={(e) => setUpdatedJobTitle(e.target.value)}></input><br></br>
        <label>Update Company Name: </label>
        <input onChange={(e) => setUpdatedCompanyName(e.target.value)}></input><br></br>
        <button onClick={(e) => updateUser(e, user)}>Update</button>
        </div>
    </form>
    )
}