// Versión con LocalStorage

// Importamos la librería de Zustand
import {create} from 'zustand';

// Importamos el middleware de persistencia
import { persist } from 'zustand/middleware';

// Definimos una interfaz para el estado de la autenticación
interface AuthState {
  role: string; // El rol del usuario (admin o user)
  token: string; // El token de acceso del usuario
  login: (role: string, token: string) => void; // Una función para iniciar sesión
  logout: () => void; // Una función para cerrar sesión
}

// Creamos el hook de Zustand para el estado de la autenticación
export const useAuthStore = create<AuthState>(
  // Usamos el middleware de persistencia
  persist(
    // Definimos el estado y las acciones
    (set) => ({
      role: '', // Inicializamos el rol vacío
      token: '', // Inicializamos el token vacío
      login: (role, token) => {
        // Actualizamos el estado con el nuevo rol y token
        set({ role, token });
      },
      logout: () => {
        // Actualizamos el estado con un rol y token vacíos
        set({ role: '', token: '' });
      },
    }),
    // Configuramos el middleware de persistencia
    {
      name: 'authState', // El nombre del item en el almacenamiento (debe ser único)
      storage: localStorage, // El almacenamiento que queremos usar (por defecto es localStorage)
    }
  )
);

import React, { useState } from "react";
import Swal from 'sweetalert2';
import { Box, Container } from '@material-ui/core';
import { Typography, TextField, FormControlLabel, Button, Checkbox } from '@material-ui/core';
import axios from 'axios';

async function loginUser(credentials) {
  try {
    const response = await axios.post("https://www.mecallapi.com/api/login", credentials);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default function SignIn() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(credentials);
    if (response && "accessToken" in response) {
      Swal.fire({
        title: 'Success',
        text: response.message,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      }).then((value) => {
        localStorage.setItem("accessToken", response["accessToken"]);
        localStorage.setItem("user", credentials.username);
        window.location.href = "/profile";
      });
    } else {
      Swal.fire({
        title: 'Failed',
        text: response.message,
        icon: 'error'
      });
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

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
          backgroundColor: "teal"
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoComplete="email"
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
