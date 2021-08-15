import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Redirect, useHistory, Link } from "react-router-dom";
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HttpsIcon from '@material-ui/icons/Https';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../App.css';
import api from '../api';

const useStyles = makeStyles({
    root: {
        maxWidth: 480,
        margin:'auto',
        marginTop: '100px',
        padding: '20px'
      },
    title:{
        color:'#0033A0',
        fontWeight: 'bold'
    },
    
    field:{
        width:'60%',
       margin:'auto',
       marginTop:'20px',
       //borderColor: '#999',
        //border: '1px solid '  
    },
    btn:{
        backgroundColor:'#00E1CD',
        margin:'30px',
        color:'#fff'
    },
    lnk:{
        textDecoration: 'none'
    }
});


const Login = () => {
    const classes = useStyles();

    const [openAlertCode, setOpenAlertCode] = useState(false);

    const [openAlertLogin, setOpenAlertLogin] = useState(false);

    //const [usuario, setUsuario] = useState();

    const [dataLogin, setDataLogin] = useState({
        userLogin: "",
        passLogin: "",
        phoneCode: "",
    });

    let history = useHistory(); 
    
    const handleInput = (event) => {
        const { value, name } = event.target;
        
        setDataLogin({
            ...dataLogin,
            [name]: value,
        });
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
        }

    const handleCloseAlertCode = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlertCode(false);
      };

    const handleCloseAlertLogin = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlertLogin(false);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //const { userLogin, passLogin } = dataLogin;
        //http://147.182.244.196:8080/api/login
        axios.post(`http://${api}/api/login`,dataLogin)
        .then(response => {
            //console.log(response.data);
            
            //console.log(typeof(response.data));
            //const rsp = response.data
            //setUsuario(response.data);
            //setUsuario(rsp);
            //console.log(usuario);
            //<Home usuario={response.data} />
            if(response.data!=='Not Matched'){
                localStorage.setItem("user",JSON.stringify(response.data));
                history.push("/home");
            }else{
                setOpenAlertLogin(true);
            }
            //<Redirect to="/Home"></Redirect>;
        });
    };

    const handleCode = () => {
        axios.post(`http://${api}/api/getcode`,dataLogin)
        .then(response => {
            console.log(response.data);
            setOpenAlertCode(true);
        });
    }
    const [titulo,setTitulo] = React.useState("");
    const [leyenda,setLeyenda] = React.useState("");
    const [errorTitulo, setErrorTitulo]= React.useState(false);

    const [numero,setNumero] = React.useState("");
    const [leyendaNro,setLeyendaNro] = React.useState("");
    const [errorNumero, setErrorNumero]= React.useState(false);
    return (
        <div className="App">
            <Container  fixed>
            <Grid container>
            <Grid item xs={12}><br></br><br></br>
            <Paper elevation={2} className={classes.root}>
                  <Typography variant="h4" color="primary" className={classes.title} >
                      Bienvenido
                    </Typography>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className={classes.field}>
                            <Grid container spacing={1} alignItems="flex-end">
                            {/*<Grid item xs={1}>
                            <AccountCircleIcon  fontSize="medium" color="primary"/> 
                            </Grid>*/}
                            <Grid item xs={11}>
                            <TextField 
                            size="small" variant="filled" style={{  width: '100%' }}  label="DNI" 
                            inputProps={{maxlength:8}} 
                        onKeyPress=
                        {(e)=>{
                            
                            setTitulo(e.target.value)
                            let regex = new RegExp(/^[0-9]+$/i);

                            if(!regex.test(titulo) || !titulo === " "){
                                //e.target.value = e.target.value.substring(0, e.target.value.length - 1)
                                setErrorTitulo(true);
                                setLeyenda("Dni no puede contener letras")
                                //console.log("caracter")
                            }else{
                                setErrorTitulo(false);
                                setLeyenda("");
                                //console.log("numero")
                            }
                            
                        }}
                        error={errorTitulo}
                        helperText={leyenda}  
                            type="text" name="userLogin" onChange={handleInput} />
                            </Grid>
                            </Grid>
                        </div>
                        <div className={classes.field}>
                            <Grid container spacing={1} >
                            {/*<Grid item xs={1}>
                            {<HttpsIcon  fontSize="medium" color="primary"/> }
                            </Grid>*/}
                            <Grid item xs={8}>
                            <TextField 
                            size="small" variant="filled" style={{  width: '100%' }} 
                            label="Celular"  type="text" 
                            inputProps={{maxlength:9}} 
                        onKeyPress=
                        {(e)=>{
                            
                            setNumero(e.target.value)
                            let regex = new RegExp(/^[0-9]+$/);

                            if(!regex.test(numero) || !numero === " "){
                               // e.target.value = e.target.value.substring(0, e.target.value.length - 1)
                                setErrorNumero(true);
                                setLeyendaNro("Dni no puede contener letras")
                                //console.log("caracter")
                            }else{
                                setErrorNumero(false);
                                setLeyendaNro("");
                                //console.log("numero")
                            }
                            
                        }} 
                        error={errorNumero}
                        helperText={leyendaNro} 
                            name="phoneCode" onChange={handleInput} />
                            </Grid>
                            <Grid item xs={3}>
                            <Button variant="contained" color="primary" style={{marginTop:'7px',backgroundColor:'#00E1CD'}} onClick={handleCode}>SMS</Button>
                            </Grid>
                            </Grid>
                        </div>
                        <div className={classes.field}>
                            <Grid container spacing={1} alignItems="flex-end">
                            {/*<Grid item xs={1}>
                            {<HttpsIcon  fontSize="medium" color="primary"/> }
                            </Grid>*/}
                            <Grid item xs={11}>
                            <TextField size="small" variant="filled" style={{  width: '100%' }} label="Contraseña"  type="password" name="passLogin" inputProps={{maxlength:'6'}} onChange={handleInput} />
                            </Grid>
                            </Grid>
                        
                        
                        </div>
                        <div>
                        <Button variant="contained" type="submit" color="primary" className={classes.btn} endIcon={<ArrowForwardIcon />}>Iniciar Sesión</Button>
                
                        <Link to="/register" className={classes.lnk}>
                        <Button variant="contained" className={classes.btn} color="primary" >Registrarse</Button>
                        </Link>
                        </div>
                        
                        
                    </form>
                    <Snackbar open={openAlertCode} autoHideDuration={6000} onClose={handleCloseAlertCode}>
                        <Alert onClose={handleCloseAlertCode} severity="info">
                            Ingrese el código SMS enviado como contraseña
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openAlertLogin} autoHideDuration={6000} onClose={handleCloseAlertLogin}>
                        <Alert onClose={handleCloseAlertLogin} severity="error">
                            Usuario o contraseña incorrectos
                        </Alert>
                    </Snackbar>
                  </Paper>
            </Grid>  
            </Grid>
            
                  </Container>
                  
        </div>
    )
}

export default Login