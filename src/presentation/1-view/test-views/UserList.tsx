// UserList.tsx
import { User, useStore } from './store';
//import axios from 'axios';
const API_URL = 'http://localhost:5000/users';
type Props = {
  users: User[];
  setEditingUser: (user: User | null) => void;
};
const UserList: React.FC<Props> = ({ users, setEditingUser }) => {
  const removeUser = useStore(state => state.removeUser);
  //console.log("users in USerList ",users)
  const handleDelete = (id:string) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => removeUser(id))
      .catch(error => console.error('Error:', error));
  };
  
  if (users.length === 0) {
    return <p>No hay usuarios.</p>;
  }
  return (
    <ul>
      {users.map((user:User)=> (
        <li style={{color:"white"}} key={user.id}>
          {user.name} - {user.username} - {user.role} - {user.DataPlan?.quota} - {user.DataPlan?.dataUsed}
          <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          <button onClick={() => setEditingUser(user)}>Editar</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;


/*
 const handleDelete = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    removeUser(id);
  } catch (error) {
    console.error('Error:', error);
  }
};
 */