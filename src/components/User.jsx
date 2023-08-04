import { useState } from "react";
import UpdateForm from "./UpdateForm";

export default function User() {

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

      return (
        <div>
        {users.map((user, index) => (
            <div className='userContainer' key={index}>
              <div className='infoBox'>
                <h3>User Info</h3>
                Name: {user.name} <br></br>
                Job Title: {user.jobTitle} <br></br>
                Company Name: {user.companyName} <br></br> 
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            <UpdateForm
            updateUser={updateUser}
            />
            </div>
          ))}
          </div>
      )
}