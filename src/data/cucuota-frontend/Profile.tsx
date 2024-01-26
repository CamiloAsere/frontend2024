import React, { useState } from 'react'; // Imported React and useState
import PropTypes from 'prop-types'; // Imported PropTypes
import LinearProgress from '@mui/material/LinearProgress'; // Imported LinearProgress
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, Card, CardContent } from '@mui/material';
import AppBar from '@mui/material/AppBar'; // Added AppBar import
import Toolbar from '@mui/material/Toolbar'; // Added Toolbar import
import { useNavigate } from "react-router-dom";
import {makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
//import {useFetch }from '../../presentation/4-hooks/UseCallFetch';
//import {UseFetch} from '../../presentation/4-hooks/UseFetch';
import {UseFetch} from '../../presentation/4-hooks/useFetchData';


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
        <LinearProgress  variant="determinate" {...props} />
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


/*
  let values = [];
  if (data === undefined) {
  console.error("Data is undefined");
} else if (data === null) {
  console.error("Data is null");
} else {
  values = Object.values(data);
}
*/
  const URL='http://localhost:5000/users'
  const { data  , pendiente  /*, loading  */ }= UseFetch(URL);
  console.log('data ',data)
  console.log('tipo de data ',typeof(data))
  console.log('data is?: ', data )
  

  /*
    let results=[]
  if (data !== null) {
    // Accede a las propiedades de data aquí
  results=Object.values(data).map((obj:any, i) => ({
      ...obj,
      id: i + 1,
      name:obj.name,
      username:obj.username,
      trafficD:obj.dataUsed,
      totalQuota:obj.quota,
      role:obj.role,
    }));
  }
  */

  
//console.log('results are:  ',results )
 
//console.log('posts ',posts)
if (pendiente) {
    return(<p>Cargando...</p>)
}
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
  
      <Typography variant="h5"> {/* esto es conveniencia de los estilos */}
            Welcome Manuel Alberto 
      </Typography>    {/* esto es conveniencia de los estilos */}
     {/* 
       
        const megasAvailable = user.totalQuota - user.trafficD;      
        const percentageAvailable = user.totalQuota ? megasAvailable / user.totalQuota * 100 : 0;
       
        */}
      {
       data.length===0 ? "No hay datos"
       :
      data.map((user) => {
        const { quota, dataUsed } = user.DataPlan
        const megasAvailable = quota - dataUsed      
        const percentageAvailable = quota? megasAvailable / quota * 100 : 0;
        return(
        <Card key={user.name} className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="h6">Cuota</Typography>
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel  value={percentageAvailable} />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid xs={6}>
                  <Item>UserName</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{user.username}</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>Cuota Usada</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{dataUsed} MB</Item>
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
                  <Item>{quota} MB</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>role</Item>
                </Grid>
                <Grid xs={6}>
                  <Item>{user.role}</Item>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}
    )}
    </div>
  );
  
}