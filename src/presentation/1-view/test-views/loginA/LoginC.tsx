import { ChangeEvent, FormEvent, useState } from "react";
import Swal from 'sweetalert2';
import { Box, Container } from '@mui/material';
import { Typography, TextField, FormControlLabel, Button, Checkbox } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../../../store/store";
const naranja='#FFA500'
interface Credentials {
  username: string;
  password: string;
}

interface User {
  name: string;
  role: 'admin' | 'user';
}

interface LoginResponse {
  accessToken?: string;
  message: string;
  user?: User;
}
const CUOTA_URL="http://10.34.0.203:5173/AuthUserLDAP"
async function loginUser(credentials: Credentials): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(CUOTA_URL, credentials);
    return response.data;
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred' };
  }
}

export default function SignIn() {
  const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
  const authenticate = useAuthStore(state => state.authenticate);
  const setError = useAuthStore(state => state.setError);
  const navigate = useNavigate();
  /*
  const handleSubmit =  async (event: FormEvent) => {
    event.preventDefault();
    authenticate('user', 'admin');
  };
*/
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await loginUser(credentials);
    if (response && response.accessToken && response.user) {
      Swal.fire({
        title: 'Success',
        text: response.message,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false.
      }).then((_) => {
      response.accessToken ? localStorage.setItem("accessToken", response.accessToken) : null;
      response.user ? authenticate(response.user.name, response.user.role,response.accessToken) : null;
      navigate("/dashboard");
        
        if (response.accessToken) {

          localStorage.setItem("accessToken", response.accessToken);
          ///me falta hacer persistir el estado y
          // asi sustituir localStorage.setItem("accessToken", response.accessToken); por:
          //authStore.validToken("accessToken", response.accessToken);
        }
        response.user ? authenticate(response.user.name, response.user.role ,response.accessToken) : null;
        navigate("/dashboard");
        
      });
    } else {
      Swal.fire({
        title: 'Failed',
        text: response.message,
        icon: 'error'
      });
      setError(response.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          backgroundColor: `${naranja}`
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
