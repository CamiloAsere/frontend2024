//App.js
import Signin from './Signin';
import Profile from './Profile'
import './App.css';
import ProfileAdmin from './ProfileAdmin'
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function RequireAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") === null && localStorage.getItem("accessToken") === null) {
      navigate("/");
    }
  }, [navigate]);

  return children;
}
/*
1-la importacion de SignIn esta repetida 
2-si el localStorage está vacio las otras dos condiciones siempre van 
a ser null de modo q lo mas practico y efectivo es evaluar la condicion para el username y el accessToken
asi :
function RequireAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    //if (localStorage.length === 0 && localStorage.getItem("username") === null && localStorage.getItem("accessToken") === null) {
    if (localStorage.getItem("username") === null && localStorage.getItem("accessToken") === null) {
      navigate("/");
    }
  }, [navigate]);

  return children;
}
3- Hay una inconrguencia en las importanciones no se esta importando ningun AdminProfile.js. desde AdminProfile
Me imganino q sea el mismo componente Profile en AdminProfile.js fue lo q quisiste usar como el componente AdminProfile.

*/
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/profile" element={
            <RequireAuth>
              <Profile/>
            </RequireAuth>
          } />
          <Route path="/" element={<Signin/>} />
          
          <Route path="/adminprofile" element={
            <RequireAuth>
              <ProfileAdmin/>
            </RequireAuth>
          } />
        </Routes>          
    </div>
  );
}

export default App;

/****/
//Profile.js
import React, { useState } from 'react'; // Imported React and useState
import PropTypes from 'prop-types'; // Imported PropTypes
import LinearProgress from '@mui/material/LinearProgress'; // Imported LinearProgress
import { makeStyles } from '@mui/styles';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, Card, CardContent } from '@mui/material';
import AppBar from '@mui/material/AppBar'; // Added AppBar import
import Toolbar from '@mui/material/Toolbar'; // Added Toolbar import
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { UseFetch } from './utils/CuotaData';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing,
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing,
    height: theme.spacing,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Profile() {
  const [progress, setProgress] = React.useState(10);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();  

  const { data ,pendiente } = UseFetch("http://10.34.8.66:5173/Cuota");
  const dataTotalQuota = UseFetch("http://10.34.8.66:5173/QuotaTotal");

  if (pendiente) {
    return(<p>Cargando...</p>)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const results2 = Object.values(dataTotalQuota.data).map((object, j) => ({
    ...object,
    id: j + 1,
    name:object.name,
    totalQuota:object.totalQuota,
  }));

  const results = Object.values(data).map((obj, i) => ({
    ...obj,
    id: i + 1,
    name:obj.name,
    trafficD:obj.trafficD,
  }));

  const combinedResults = results.map((user) => {
    const matchingTotalQuota = results2.find((totalQuota) => totalQuota.name === user.name);
    return {
      ...user,
      totalQuota: matchingTotalQuota ? matchingTotalQuota.totalQuota : 0,
    };
  });
  const username = user.split('@')[0];
  const filteredResults = combinedResults.filter((result) => result.name === username);
  const megasAvailable = filteredResults[0].totalQuota * 1024 - filteredResults[0].trafficD;
  const percentageAvailable = filteredResults[0].totalQuota ? (filteredResults[0].trafficD / (filteredResults[0].totalQuota * 1024)) * 100 : 0;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={"https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Image-Transparent.png"} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
        <Card key={filteredResults[0].name} className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5">{filteredResults[0].name}</Typography>
            <Typography variant="h6">Cuota</Typography>
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel  value={percentageAvailable} />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6}>
                  <Item>Cuota Usada</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{filteredResults[0].trafficD} MB</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>Cuota Free</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{megasAvailable} MB</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>Cuota Total</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{filteredResults[0].totalQuota * 1024} MB</Item>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card> 
    </div>
  );
}

/*******/
//AdminProfile.js 
import React, { useState } from 'react'; // Imported React and useState
import PropTypes from 'prop-types'; // Imported PropTypes
import LinearProgress from '@mui/material/LinearProgress'; // Imported LinearProgress
import { makeStyles } from '@mui/styles';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, Card, CardContent, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar'; // Added AppBar import
import Toolbar from '@mui/material/Toolbar'; // Added Toolbar import
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { UseFetch } from './utils/CuotaData';
// Importa tus nuevos componentes aquí
import UserList from './components/UserList';  // Ajusta la ruta según sea necesario
import QuotaManagement from './components/QuotaManagement';  // Ajusta la ruta según sea necesario
import './css/ProfileAdmin.css'
import config from './config.json'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing,
  },
  title: {    
    
  },
  large: {
    width: theme.spacing,
    height: theme.spacing,
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Profile() {
  const [progress, setProgress] = React.useState(10);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();  
  // Nuevo estado para gestionar qué componente mostrar
  const [showUserList, setShowUserList] = useState(false);
  const [showQuotaManagement, setShowQuotaManagement] = useState(false);

  const { data ,pendiente } = UseFetch(config.ServerApi+"/Cuota");
  const dataTotalQuota = UseFetch(config.ServerApi+"/QuotaTotal");

  if (pendiente) {
    return(<p>Cargando...</p>)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/");
  };

  const results2 = Object.values(dataTotalQuota.data).map((object, j) => ({
    ...object,
    id: j + 1,
    name:object.name,
    totalQuota:object.totalQuota,
  }));

  const results = Object.values(data).map((obj, i) => ({
    ...obj,
    id: i + 1,
    name:obj.name,
    trafficD:obj.trafficD,
  }));

  const combinedResults = results.map((user) => {
    const matchingTotalQuota = results2.find((totalQuota) => totalQuota.name === user.name);
    return {
      ...user,
      totalQuota: matchingTotalQuota ? matchingTotalQuota.totalQuota : 0,
    };
  });
  
  const username = user.split('@')[0];
  const filteredResults = combinedResults.filter((result) => result.name === username);
  const megasAvailable = filteredResults[0].totalQuota * 1024 - filteredResults[0].trafficD;
  const percentageAvailable = filteredResults[0].totalQuota ? (filteredResults[0].trafficD / (filteredResults[0].totalQuota * 1024)) * 100 : 0;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Avatar alt="Universidad Matanzas" src="/static/images/avatar/1.jpg" />
          <Typography variant="h6">
            Profile
          </Typography>
          <div className='buttons-topbar'>
          <Button 
            variant="contained"
            onClick={() => {
              if(showUserList === false){
                setShowUserList(true);
                setShowQuotaManagement(false);
              }
              else{
                setShowUserList(false);
                setShowQuotaManagement(false);
              }
            }}
          >
            Agregar Admin
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if(showQuotaManagement === false){
                setShowUserList(false);
                setShowQuotaManagement(true);
              }
              else{
                setShowUserList(false);
                setShowQuotaManagement(false);
              }
            }}
          >
            Cambiar Cuota
          </Button>
          </div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={"https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Image-Transparent.png"} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      {showUserList && <UserList />}
      {showQuotaManagement && <QuotaManagement />}
        <Card key={filteredResults[0].name} className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5">{filteredResults[0].name}</Typography>
            <Typography variant="h6">Cuota</Typography>
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel  value={percentageAvailable} />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6}>
                  <Item>Cuota Usada</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{filteredResults[0].trafficD} MB</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>Cuota Free</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{megasAvailable} MB</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>Cuota Total</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{filteredResults[0].totalQuota * 1024} MB</Item>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card> 
    </div>
  );
}

/*****/
//SignIn.js
import * as React from 'react';
import { useState } from "react";
import './signin.css';
import swal from 'sweetalert';
import { Box, Container, color} from '@mui/system';
import {Typography , TextField, FormControlLabel, Button, Grid , Link, Avatar} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CenterFocusStrong } from '@mui/icons-material';
import config from './config.json'

async function loginUser(credentials) {
  return fetch(config.ServerApi+"/AuthUserLDAP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "*/*",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function SignIn() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password,
    });
    if ("accessToken" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("accessToken", response["accessToken"]);
        localStorage.setItem("user", username);
        if("admin" in response){
          localStorage.setItem("admin", response["admin"]);
          navigate("/adminprofile");
        }
        else{
          navigate("/profile");
        }
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  return (
    <div className='divlogin'>
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,  
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "lightgray"
        }}
      >
        <Avatar alt="Universidad Matanzas" src="/static/images/avatar/1.jpg" />
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
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
  </div>
  );
}


/****/

//QuotaManagement.js
import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  AlertTitle,
  Alert,
} from '@mui/material';
import config from '../config.json'

const QuotaManagement = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [gigabytes, setGigabytes] = useState(0);
  const [alertStatus, setAlertStatus] = useState(null);
  const [newQuota, setNewQuota] = useState(null)

  useEffect(() => {
    // Simular una llamada a la API para obtener los datos del usuario
    const fetchData = async () => {
      // Reemplaza la URL con tu API real
      const response = await fetch(config.ServerApi+'/QuotaTotal');
      const data = await response.json();
      data.forEach(element => {
        if (element.name === localStorage.getItem('user').split('@')[0]) {
          setUserData(element.totalQuota);
        }
      });
    };

    fetchData();
  }, []);

  const sendData = (url, username, gigabytes) => {
    const data = {
      username: String(username),
      gigabytes: Number(gigabytes)
    };
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          console.log(`Status: ${response.status}`);
          setAlertStatus('error');
        } else {
          setAlertStatus('success');
          setNewQuota(gigabytes);
          // Actualizar los datos del usuario
         fetchData();
        }
        return response.status;
      })
      .catch(error => {
        console.error('Error:', error);
        setAlertStatus('error');
      });
  };

  return (
    <div>
      <Typography variant="h5">Gestión de Cuotas</Typography>
      {userData && (
        <Box mt={2}>
          <Typography variant="h6">{`Admin: ${localStorage.getItem("user").split('@')[0]}`}</Typography>
          <TextField
            label="Usuario a asignar"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Typography variant="body1">{`Cuota Actual: ${userData} GB`}</Typography>
          <TextField
            label="Gigabytes a asignar"
            type="number"
            value={gigabytes}
            onChange={(e) => setGigabytes(parseInt(e.target.value, 10))}
          />
          <Typography variant="body1">{`Nueva Cuota: ${newQuota} GB`}</Typography>
          <Button variant="contained" onClick={async () => {
            const status = await sendData(config.ServerApi+'/ChangeQuota', username, gigabytes);
            if (status === 200) {
              setAlertStatus('success');
              setTimeout(() => {
                setAlertStatus(null);
              }, 3000);
            }
            else{
              setAlertStatus('error');
              setTimeout(() => {
                setAlertStatus(null);
              }, 3000);
            }
          }}>
            Enviar
          </Button>
          {alertStatus === 'success' && (
            <Alert severity="success">
              <AlertTitle>Correcto</AlertTitle>
              Cuota Actualizada
            </Alert>
          )}
          {alertStatus === 'error' && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Ha ocurrido un Error
            </Alert>
          )}
        </Box>
      )}
    </div>
  );
};

export default QuotaManagement;

/*
Los datos al actualizar el estado  de las cuentas no se esta actualizando visualmente en la interface si no se recarga la pagina 
la solucion cavernicola es volver a llamar a fetchData luego de actualizar algun datos del estado en sendData
Solucion :  
-sacar el fetch del useEffect y llamarlo dentro
-llamar a la funcion fecthData luego de enviar los datos con sendData
*/
// Definir fetchData fuera del useEffect
const fetchData = async () => {
    const response = await fetch(config.ServerApi+"/QuotaTotal");
    const data = await response.json();
    data.forEach(element => {
      if (element.name === localStorage.getItem('user').split('@')[0]) {
        setUserData(element.totalQuota);
      }
    });
  };
  
  useEffect(() => {
    // Llamar a fetchData dentro del useEffect
    fetchData();
  }, []);
  
  const sendData = (url, username, gigabytes) => {
    const data = {
      username: String(username),
      gigabytes: Number(gigabytes)
    };
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          console.log(`Status: ${response.status}`);
          setAlertStatus('error');
        } else {
          setAlertStatus('success');
          setNewQuota(gigabytes);
          // Llamar a fetchData dentro de sendData
          fetchData();
        }
        return response.status;
      })
      .catch(error => {
        console.error('Error:', error);
        setAlertStatus('error');
      });
  };
  /*****/

  //UsersList.js
  import React, { useState } from 'react';
  import {
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
  } from '@mui/material';
  
  const UserList = () => {
    const [users, setUsers] = useState([
      { id: 1, name: 'Usuario 1', isAdmin: false },
      { id: 2, name: 'Usuario 2', isAdmin: false },
      { id: 3, name: 'Usuario 3', isAdmin: false },
      // Agrega más usuarios según sea necesario
    ]);
  
    const handleCheckboxChange = (userId) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
        )
      );
    };
    return (
      <div>
        <Typography variant="h5">Lista de Usuarios</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id} dense button>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={user.isAdmin}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </ListItemIcon>
              <ListItemText primary={`${user.name} ${user.isAdmin ? '(Admin)' : ''}`} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };
  
  export default UserList;

