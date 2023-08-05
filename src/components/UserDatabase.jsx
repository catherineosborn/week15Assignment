import { useEffect, useState } from 'react';
import User from "./User";
import NewUserForm from "./NewUserForm";

export default function UserDatabase() {
  const MOCK_API_URL = 'https://6496b26383d4c69925a3054f.mockapi.io/user'

  const [users, setUsers] = useState([]);

  function getUsers(){
    fetch(MOCK_API_URL)
      .then(data => data.json())
      .then(data => setUsers(data))
  }

  function handleNewUser(newUser) {
    setUsers([...users, newUser]);
}

  useEffect (() => {
    getUsers()
  }, []);

  function deleteUser(id){
    fetch(`${MOCK_API_URL}/${id}`, {
      method: 'DELETE'
    }).then(() => getUsers());
  }

  function postNewUser(newUser){
    fetch(MOCK_API_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    }).then(() => getUsers());
  }

  function updateUser(updatedUser){
    fetch(`${MOCK_API_URL}/${updatedUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => getUsers());
  }

  return (
    <div className="App">
       <NewUserForm postNewUser={postNewUser} handleNewUser={handleNewUser}/>
        {users.map((user) => (
          
        <User
          key={user.id}
          user={user}
          updateUser={updateUser}
          deleteUser={deleteUser}
        /> 
      ))} 
    </div>
  );
}