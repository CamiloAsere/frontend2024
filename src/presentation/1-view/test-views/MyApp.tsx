//MyApp.tsx
import React, { useEffect } from 'react';
import { useStore } from './store';
import UserList from './UsersList2';
import UserForm from './UserForm';
import axios from 'axios';
import WelcomeCard from './WelcomeCard';
import { useAuthStore } from '../../../store/store';
import Button from '../pages/errorPage/Button';
import './userslist.css'
import { Link } from 'react-router-dom';
import Plans from './Plans';
const API_URL = 'http://localhost:5000/users';
const DATA_PLAN_API_URL='http://localhost:5000/current-plans'
const MyApp: React.FC = () => {
  const users = useStore(state => state.users );
  const editingUser = useStore(state => state.editingUser);
  const setUsers = useStore(state => state.setUsers );
  const setEditingUser = useStore(state => state.setEditingUser);
  const dataPlans= useStore(state => state.dataPlans);
  const setDataPlans = useStore(state => state.setDataPlans );
  const { name, id } = useAuthStore(state => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const dataPlanResponse = await axios.get(DATA_PLAN_API_URL);
        setUsers(response.data);
        setDataPlans(dataPlanResponse.data);
      } catch (error: any) {
        if (error.response) {
          console.error('Error fetching users:', error);
          if (error.response.status !== 200) {
            console.error(`HTTP error! status: ${error.response.status}`);
          }
        }
      }
      
      
    };
  
    fetchData();
  }, [setUsers, setDataPlans]);
  //console.log("users in MyApp.tsx ",users)
  return (
<div style={{ 
    display: 'grid', 
    alignItems: "space-between", 
    marginTop:'2rem',
    gridTemplateColumns: '60% 30%', 
    gap: '13%', 
    margin: 'auto',
    paddingLeft: '15%',// Añade un padding a la izquierda para alejar el componente del borde
  }}>

<WelcomeCard name={name} role="" />
  <div >
    <UserList userId={id} users={users} setEditingUser={setEditingUser} />
    </div>
    <div >
    {editingUser && <UserForm editingUser={editingUser} setEditingUser={setEditingUser} dataPlans={dataPlans} />}
    {!editingUser && <Button bgcolor="#1877F2" color="white" bghover='black' href="/signup" content="crear Usuario" />}
    </div>
    <div>
      <Plans dataPlan={dataPlans}/>
    </div>
     </div>

  );
};

export default MyApp;


