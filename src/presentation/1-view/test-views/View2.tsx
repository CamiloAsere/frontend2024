// Código de UserForm.tsx con styled-components
import React, { FC, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useStore } from '../../../store/userPlanData';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: teal;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const UserForm: FC = () => {
  // Lógica del formulario...
  const dataPlans = useStore(state => state.dataPlans);
  const userData = useStore(state => state.userData);
  const error = useStore(state => state.error);
  const setUserData = useStore(state => state.setUserData);
  const setError = useStore(state => state.setError);
  const setDataPlans = useStore(state => state.setDataPlans);
  useEffect(() => {
      axios.get('/dataplan')
        .then(response => {
          setDataPlans(response.data);
          const newDataPlan = response.data[0].id;
          setUserData({ ...userData, dataPlan: newDataPlan });
        });
    }, [userData]);
    
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userData.name === '' || userData.email === '' || userData.username === '' || userData.userType === '') {
      setError('Todos los campos son obligatorios');
    } else {
      axios.post('/user', userData)
        .then(response => {
          console.log(response.data);
          setError(null);
          setUserData({ name: '', email: '', username: '', dataPlan: '', userType: '' }); // Limpiar el formulario
        })
        .catch(error => {
          if (error.response) {
            setError(`Error: ${error.response.data.message}`);
          } else {
            console.error(error);
            setError('Ocurrió un error inesperado');
          }
        });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <Input type="text" name="name" value={userData.name} onChange={handleChange} required />
      </label>
      <label>
        Correo electrónico:
        <Input type="email" name="email" value={userData.email} onChange={handleChange} required />
      </label>
      <label>
        Nombre de usuario:
        <Input type="text" name="username" value={userData.username} onChange={handleChange} required />
      </label>
      <label>
        Plan de datos:
        <Select name="dataPlan" value={userData.dataPlan} onChange={handleChange} required>
          {dataPlans.map(plan => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
        </Select>
      </label>
      <label>
        Tipo de usuario:
        <Select name="userType" value={userData.userType} onChange={handleChange} required>
          <option value="worker">Trabajador</option>
          <option value="student">Estudiante</option>
          <option value="teacher">Profesor</option>
        </Select>
      </label>
      <Button type="submit">Agregar usuario</Button>
      {error && <p>{error}</p>}
    </Form>
  );
};

export default UserForm;
