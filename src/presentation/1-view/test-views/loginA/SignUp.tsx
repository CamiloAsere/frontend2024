
/*
import React, { useState, FormEvent } from 'react';
import { Container, Box, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

const AddUser = () => {
  const [userDetails, setUserDetails] = useState<User>({
    name: '',
    email: '',
    username: '',
    password: '',
    role: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
      const data = await response.json();
      console.log("Usuario creado ",data)
    } catch (error) {
      console.error(error);
    }
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
          backgroundColor: '#c8001a'
        }}
      >
        <Typography component="h1" variant="h5">
          Agregar usuario
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="role"
            label="Rol"
            type="text"
            id="role"
            autoComplete="role"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordar usuario"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Agregar usuario
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddUser;
*/


import React, { useState, FormEvent } from 'react';
import { Container, Box, Typography, TextField, FormControlLabel, Checkbox, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../../../store/store';

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

const AddUser = () => {
  const [userDetails, setUserDetails] = useState<User>({
    name: '',
    email: '',
    username: '',
    password: '',
    role: '',
  });
  const setError = useAuthStore((state) => state.setError);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };
  const resetForm = () => {
    setUserDetails({
      name: '',
      email: '',
      username: '',
      password: '',
      role: '',
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message)
        throw new Error(data.message);
        
      }
      const data = await response.json();
      console.log("Usuario creado ",data)
      // Limpia el formulario
      resetForm();
      // Muestra un sweetalert de éxito
      Swal.fire(
        '¡Buen trabajo!',
        'El usuario ha sido creado satisfactoriamente',
        'success'
      );
    } catch (error:any) {
      // Muestra un sweetalert con el mensaje de error del controlador
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        footer: '<a href>¿Por qué tengo este problema?</a>'
      });
    }
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
          backgroundColor:"white"
          /* backgroundColor: '#c8001a'  */
        }}
      >
       <Typography component="h1" variant="h5">
          Agregar usuario
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
         <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
            value={userDetails.name} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={userDetails.email} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            onChange={handleChange}
            value={userDetails.username} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={userDetails.password} 
          />
          {/*
          <TextField
            margin="normal"
            required
            fullWidth
            name="role"
            label="Rol"
            type="text"
            id="role"
            autoComplete="role"
            onChange={handleChange}
            value={userDetails.role} 
          />
           */}
            <FormControl fullWidth>
            <InputLabel id="role-label">Rol</InputLabel>
            <Select
            labelId="role-label"
            id="role"
            value={userDetails.role}
            onChange={handleChange}
            name="role"
            required
            >
            <MenuItem value={'user'}>User</MenuItem>
            <MenuItem value={'admin'}>Admin</MenuItem>
            </Select>
            </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordar usuario"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Agregar usuario
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddUser;


