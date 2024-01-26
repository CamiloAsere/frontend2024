// UserForm.tsx
import React, { useEffect, useState } from 'react';
import { DataPlan, User, useStore } from './store';
import './userform.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../../store/store';
const API_URL = 'http://localhost:5000/users';
import cross from "../../../assets/cross.png"
type Props = {
  editingUser: any | null;
  setEditingUser: (user: User | null) => void;
  dataPlans:DataPlan | null;
};
const UserForm: React.FC<Props> = ({ editingUser, setEditingUser, dataPlans }) => {
 
  const initialFormState = {
    id: '',
    name: '',
    username: '',
    role: '',
    DataPlan: {
      name:'',
      quota: '',
      dataUsed: '',
    },
  };
  
  console.log('current dataPlans: ',dataPlans)
  const [formState, setFormState] = useState(initialFormState);
  const updateUser = useStore(state => state.updateUser);
  const setError = useAuthStore(state => state.setError);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (editingUser) {
      setFormState(editingUser);
    }else{setFormState(initialFormState);}
  }, [editingUser]);
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  const handleDataPlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const value = (event.target.name === 'quota' || event.target.name === 'dataUsed') ? Number(event.target.value) : event.target.value;
    setFormState({
      ...formState,
      DataPlan: {
        ...formState.DataPlan,
        [event.target.name]: value,
      },
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    if (formState.DataPlan && formState.DataPlan.quota < formState.DataPlan.dataUsed) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La cuota no puede ser menor que los datos utilizados',
      });
      return;
    }
    if (editingUser) {
      try {
      // Actualizar el usuario en el backend
      const userResponse = await axios.put(`${API_URL}/${formState.id}`, formState);
      // Actualizar el estado del usuario en el frontend
      updateUser(formState.id, userResponse.data);
      // Actualizar el plan de datos del usuario en el backend
      if (formState.DataPlan) {
        //console.log("Plan de datos ",formState.DataPlan)
        const userResponse2 = await axios.put(`${API_URL}/${formState.id}/dataPlan`, formState.DataPlan)
        // Actualizar el estado del usuario en el frontend
        updateUser(formState.id, userResponse2.data);
        setError("DataPlan actualizado")
       }  
       setEditingUser(null);
       setError("Lista de users actualizada")
       //setRefresh(!refresh)
      } catch (error:any) {
        console.error('Error:', error);
        setError(`Hubo un error: ${error.message}`)
      }
    } else {
      // Crear usuario
    }
  };
  const handleClose = () => {
    setEditingUser(null);
  };
return (
    <form className="user-form" onSubmit={handleSubmit}>
    <button onClick={handleClose}>
    <img src={cross} />
    </button>
    <label >
      <input placeholder='username' type="text" name="username" value={formState.username} readOnly  />
    </label>
    <label>
        Rol:
        <select name="role" required value={formState.role} onChange={handleChange}> {/* Cambia el campo de entrada de texto a un elemento select */}
          <option value="">Selecciona un rol</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          {/* ... otros roles ... */}
        </select>
      </label>
      <label>
  Nombre del plan de datos :
  <input type="text" id='' name='dataPlanName' value={formState.DataPlan ? formState.DataPlan.name : "no tiene plan"} readOnly={formState.DataPlan?.name ? true : false} />
</label>

<label>
     Cuota:
     <input type="number" required name="quota" value={formState.DataPlan?.quota || ''} onChange={ handleDataPlanChange } />
     </label>
      <label>
     Datos utilizados:
     <input type="number" required name="dataUsed" value={formState.DataPlan?.dataUsed || ''} onChange={handleDataPlanChange} />
     </label>
     {/* ... otros campos del formulario */}
    <button style={{backgroundColor:"#1877F2" ,color:"white"}} type="submit">Actualizar</button>
    </form>
  );
};
export default UserForm;
/*
console.log("response.data en UserForm: ",response.data)
const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`${API_URL}/${formState.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    })
      .then(response => response.json())
      .then(data => {
        updateUser(formState.id, data);
        setFormState(initialFormState);
      })
      .catch(error => console.error('Error:', error));
  };

*/