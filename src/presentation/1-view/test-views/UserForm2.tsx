//Revisa este codigo detalladamente q t dare a continuacion . Revisa ,corrige y mejora cualquier deficiencia o error ya sea en tipado en logica o implementacion en mi codigo para obtener una version mejorada q siga las buenas practicas de programacion :
//LoginForm.tsx
// UserForm.tsx
import React, { useEffect, useState } from 'react';
import { DataPlan, User, useStore } from './store';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

interface UserDetails {
  username: string;
  password: string;
  role: UserRole;
}

///Mis estilos con styled components que ya estanimplementados
///
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  width:100%;
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
  
  width: 90%;
  max-width: 400px;
`;
const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  max-width: 400px;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  max-width: 400px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const API_URL = 'http://localhost:5000/users';
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
  
  const [formState, setFormState] = useState(initialFormState);
  const updateUser = useStore(state => state.updateUser);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (editingUser) {
      setFormState(editingUser);
    }
  }, [editingUser]);
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  const handleDataPlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /*
    let value;
    if (String(value).startsWith('0')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El valor no puede comenzar con cero',
      });
      return;
    }
    */
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
        console.log("dataplan actualizado")
       }  
       setFormState(initialFormState);  // Esto forzará una actualización del componente
       setEditingUser(null);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Crear usuario
    }
  };

  return (
      <Card>
        <Form onSubmit={handleSubmit}>
        <label >
      <h2>{formState.username}</h2>
    </label>
    <label >
      <Input placeholder='role' type="text" name="role" value={formState.role} onChange={ handleChange }  />
    </label>
    <label>
  Nombre del plan de datos :
  <Input type="text" value={formState.DataPlan?.name || ''}  onChange={handleDataPlanChange} />
</label>
<label>
     Cuota:
     <Input type="number" name="quota" value={formState.DataPlan?.quota || ''} onChange={ handleDataPlanChange } required />
     </label>
      <label>
     Datos utilizados:
     <Input type="number" name="dataUsed" value={formState.DataPlan?.dataUsed || ''} onChange={handleDataPlanChange} />
     </label>
       <Select name="role" value={formState.role} onChange={formState} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
          <Button type="submit">Log in</Button>
        </Form>
      </Card>
  );
}
export default UserForm