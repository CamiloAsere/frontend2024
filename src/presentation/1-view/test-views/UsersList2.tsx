// UsersTable.tsx
import React from 'react';
import { User, useStore } from './store';
import axios from 'axios';
import styled from 'styled-components';
const API_URL = 'http://localhost:5000/users';
import './userslist.css'
import Swal from 'sweetalert2';
import { Typography } from '@mui/material';
import styles from '../../../assets/TableQ.module.css';
import { MySignal } from './signal';
import Spinner from './panel/Spinner';
import { useAuthStore } from '../../../store/store';

type Props = {
  userId: User;
  users: User[];
  //handleDeleteUser: (id: string) => void;
  setEditingUser: (user: User | null) => void;
};
const Table = styled.table`

 width:100%;
    max-width: 259rem;
    margin: 0 auto;
    border-collapse: collapse;
    background-color: gray;
  `;
  
  const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #007bff;
  `;
  
  const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    color:white
  `;
  
  const ProgressBarContainer = styled.div`
    position: relative;
    width: 100%;
    background-color: #f8f9fa;
    border-radius: 4px;
    color: black;
  `;
  const ProgressBarLabel = styled.span`
      position: absolute;
      width: 100%;
      text-align: center;
      top: 50%;
      transform: translateY(-50%);
  `;
  interface ProgressBarProps {
      percentage: number,
      color: string
  }
  
  const ProgressBar = styled.div<ProgressBarProps>`
      height: 20px;
      width: ${props => props.percentage}%;
      background-color: ${props => props.color};
      transition-duration:.5s; // Agregamos una transición para suavizar el cambio cuando se actualiza la barra de progreso
  `;
  interface ProgressBarComponentProps {
      percentage: number,
      color: string,
      label?: string
  }
  
  const ProgressBarComponent = ({ percentage, color, label }: ProgressBarComponentProps) => (
      <ProgressBarContainer>
          <ProgressBar percentage={percentage} color={color} />
          <ProgressBarLabel>{label}</ProgressBarLabel>
      </ProgressBarContainer>
  );
const UsersTable: React.FC<Props> = ({ users , setEditingUser ,userId}) => {
    const removeUser = useStore(state => state.removeUser);
    const setError = useAuthStore(state => state.setError);
    
    const handleDeleteUser = async (id: string) => {
        if (id !== userId) {
          try {
            await axios.delete(`${API_URL}/${id}`);
            removeUser(id);
          } catch (error) {
            console.error('Error:', error);
          }
        } else {
            setError('Un administrador no puede eliminarse a sí mismo');

        }
      };
      
   
    return (
      <Table >
        <thead>
          <tr>
            <Th title='Nombre' className={styles.questionColumn}>Nombre</Th>
            <Th title='Nombre de usuario' className={styles.questionColumn}>Nombre de usuario</Th>
            <Th title='email' className={styles.questionColumn}>email</Th>
            <Th title='rol' className={styles.questionColumn}>Rol</Th>
            <Th title='Megas disponibles' className={styles.questionColumn}>Megas disponibles</Th>
            <Th title='Megas usados' className={styles.questionColumn}>Megas usados</Th>
            <Th title='Total de megas del plan' className={styles.questionColumn}>Total de megas del plan</Th>
            <Th title='Modifica' className={styles.questionColumn}>Modificar</Th>
          </tr>
        </thead>
        <tbody>
          { 
          users? 
          users.map((user) => {
            let quota = 0
            let dataUsed = 0;
            if (user.DataPlan) {
              quota = user.DataPlan.quota;
              dataUsed = user.DataPlan.dataUsed;
            }
            
           /*
            const quota = user.DataPlan?.quota;
             const dataUsed = user.DataPlan?.dataUsed;
            */
            const megasAvailable = quota - dataUsed;
            const percentageAvailable = quota ? megasAvailable / quota * 100 : 0;
            const percentageUsed = quota ? dataUsed / quota * 100 : 0;
  
  
          return (
            <tr key={user.id}>
              <Td title={user.name} className={styles.questionColumn}>{user.name}</Td>
              <Td title={user.username} className={styles.questionColumn}>{user.username}</Td>
              <Td title={user.email} className={styles.questionColumn}>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td><ProgressBarComponent percentage={percentageAvailable} color="#28a745" label={`${megasAvailable}`} /></Td>
              <Td><ProgressBarComponent percentage={percentageUsed} color="#007bff" label={`${dataUsed}`} /></Td>
              <Td>{quota}</Td>
              <Td style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='editButton'  onClick={() => setEditingUser(user)}>Editar</button>
                <button className='deleteButton'  onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </Td>

            </tr>
          );
        })   
        : <Spinner/> }
      </tbody>
    </Table>
  );
};

export default UsersTable;
