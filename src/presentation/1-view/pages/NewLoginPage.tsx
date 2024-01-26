// LoginPage.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/store';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Typography } from '@mui/material';

interface UserDetails {
  username: string;
  password: string;
};

// Tus componentes estilizados aquí
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

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoginPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({ username: "", password: "" });
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const authenticate = useAuthStore((state) => state.authenticate);
  const setError = useAuthStore((state) => state.setError);
  
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/protected');
      }
    }
  }, [navigate]);
  


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const URL_POST='http://localhost:5000/app/login'
      const response = await fetch(URL_POST, { // Reemplaza '/api/login' con la URL de tu API de inicio de sesión
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails)
      });
      if (!response.ok) {
        Swal.fire({
          title: 'Error',
          text: 'Error al iniciar sesión. Por favor, verifica tus credenciales.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
        throw new Error('Error al iniciar sesión');
        
      }
      const data = await response.json();
      //console.log(`credenciales \n user logged info ${data.user}\n token: ${data.token}` )
      authenticate(data.user.id ,data.user.username, data.user.role, data.token); // Asume que tu API devuelve un objeto con username, role y token
/*
    // Navega a la nueva ruta después de autenticarse
    if (data.user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/protected');
    }
*/
    } catch (error:any) {
      console.error(error);
      setError(error.message)
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    });
  };
  
  if (token) {

    Swal.fire({
      title: 'Atención',
      text: `Ahora hay un ${user?.role} llamado ${user?.name} logeado.`,
      icon: 'info',
      confirmButtonText: 'Entendido'
    })
    
      if (user?.role=== 'admin') {
        navigate('/admin');
      } else {
        navigate('/protected');
      }

    
  }
  
 /*
  if (user ) {
    return <>
    <Typography color="white">
      Ya hay un usuario logeado
    </Typography>
    </>
  }
  */

  return (
    <Container>
      <Card>
        <Form onSubmit={handleSubmit}>
          <Input name="username" value={userDetails.username} onChange={handleChange} required placeholder="Username" />
          <Input name="password" value={userDetails.password} onChange={handleChange} required placeholder="Password" type="password" />
          <Button type="submit">Log in</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;
