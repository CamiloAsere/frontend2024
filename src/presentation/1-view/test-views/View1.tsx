// Código de UserForm.tsx con @mui/material
import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, FormControlLabel, Button, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useStore } from '../../../store/userPlanData';
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
  const handleSelectChange = (event: SelectChangeEvent) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
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
            id="name"
            label="Nombre"
            name="name"
            autoComplete="name"
            autoFocus
            value={userData.name}
            onChange={handleTextFieldChange }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleTextFieldChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            value={userData.username}
            onChange={handleTextFieldChange }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="dataPlan-label">Plan de datos</InputLabel>
            <Select
            labelId="dataPlan-label"
            id="dataPlan"
            name="dataPlan"
            value={userData.dataPlan}
            onChange={handleSelectChange}
            required
>
  {dataPlans.map(plan => <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>)}
</Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="userType-label">Tipo de usuario</InputLabel>
            <Select
              labelId="userType-label"
              id="userType"
              name="userType"
              value={userData.userType}
              onChange={handleChange}
              required
            >
              <MenuItem value="worker">Trabajador</MenuItem>
              <MenuItem value="student">Estudiante</MenuItem>
              <MenuItem value="teacher">Profesor</MenuItem>
            </Select>
          </FormControl>
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
          {error && <p>{error}</p>}
        </Box>
      </Box>
    </Container>
  );
};

export default UserForm;
