import { useEffect, useState } from 'react';
import User from "./User";
import NewUserForm from "./NewUserForm";

export default function Database() {
  const MOCK_API_URL = 'https://6496b26383d4c69925a3054f.mockapi.io/user'

  const [users, setUsers] = useState([{
    name: 'Catherine',
    jobTitle: 'Ministry Assistant',
    companyName: 'Calvary Christian Church'
  }])
  
  const [newUserName, setNewUserName] = useState('')
  const [newUserJobTitle, setNewUserJobTitle] = useState('')
  const [newUserCompanyName, setNewUserCompanyName] = useState('')
  
  const [updatedName, setUpdatedName] = useState('')
  const [updatedJobTitle, setUpdatedJobTitle] = useState('')
  const [updatedCompanyName, setUpdatedCompanyName] = useState('')
  
  function getUsers(){
    fetch(MOCK_API_URL)
    .then(data => data.json())
    .then(data => setUsers(data))
  }
  
  useEffect (() => {
    getUsers()
  }, [])
  
  function deleteUser(id){
    fetch(`${MOCK_API_URL}/${id}`, {
      method: 'DELETE'
    }).then(() => getUsers())
  }
  
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
    <div className="App">
        <NewUserForm postNewUser={postNewUser}/>

      {users.map((user, index) => (
        <User
            key={index}
            user={user}
            updateUser={updateUser}
            deleteUser={deleteUser}
        />
      ))}
    </div>
  )
}