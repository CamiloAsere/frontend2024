import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { Box, Container } from '@mui/material';
import { Typography, TextField, FormControlLabel, Button, Checkbox } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../../../store/store";
const naranja='#FFA500'

interface UserDetails {
  username: string;
  password: string;
};
export default function SignIn() {
  const [userDetails, setUserDetails] = useState<UserDetails>({ username: "", password: "" });
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const authenticate = useAuthStore((state) => state.authenticate);

  
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    });
  };
  /*
  if (user) {
    Swal.fire({
      title: 'Atención',
      text: `Ya hay un ${user?.role} llamado ${user?.name} logeado.`,
      icon: 'info',
      confirmButtonText: 'Entendido'
    }).then(() => {
      navigate('/');
    });
    return null;
  }
  */
  if (token ) {
    return <p>Ya hay un usuario logeado.</p>;
  }
  

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: `${naranja}`
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
