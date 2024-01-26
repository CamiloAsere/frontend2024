//UserForm.tsx 
import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../../store/userPlanData';
const UserForm: FC = () => {
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
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={userData.name} onChange={handleChange} required />
        </label>
        <label>
          Correo electrónico:
          <input type="email" name="email" value={userData.email} onChange={handleChange} required />
        </label>
        <label>
          Nombre de usuario:
          <input type="text" name="username" value={userData.username} onChange={handleChange} required />
        </label>
        <label>
          Plan de datos:
          <select name="dataPlan" value={userData.dataPlan} onChange={handleChange} required>
            {dataPlans.map(plan => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
          </select>
        </label>
        <label>
          Tipo de usuario:
          <select name="userType" value={userData.userType} onChange={handleChange} required>
            <option value="worker">Trabajador</option>
            <option value="student">Estudiante</option>
            <option value="teacher">Profesor</option>
          </select>
        </label>
        <button type="submit">Agregar usuario</button>
        {error && <p>{error}</p>}
      </form>
    );
  };
  
  export default UserForm;
  