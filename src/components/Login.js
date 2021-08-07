import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Redirect, useHistory } from "react-router-dom";
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HttpsIcon from '@material-ui/icons/Https';

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
    }
});


const Login = () => {
    const classes = useStyles();

    //const [usuario, setUsuario] = useState();

    const [dataLogin, setDataLogin] = useState({
        userLogin: "",
        passLogin: "",
    });

    let history = useHistory(); 
    
    const handleInput = (event) => {
        const { value, name } = event.target;
        
        setDataLogin({
            ...dataLogin,
            [name]: value,
        });
    };
    
    const handleSubmit = () => {
        //const { userLogin, passLogin } = dataLogin;

        axios.post("http://127.0.0.1:8000/api/login",dataLogin)
        .then(response => {
            //console.log(response.data);
            localStorage.setItem("user",JSON.stringify(response.data));
            //console.log(typeof(response.data));
            //const rsp = response.data
            //setUsuario(response.data);
            //setUsuario(rsp);
            //console.log(usuario);
            //<Home usuario={response.data} />
            history.push("/Home");
            //<Redirect to="/Home"></Redirect>;
        });
    };

    return (
        <>
            
                  <Paper elevation={3} className={classes.root}>
                  <Typography variant="h4" color="primary" className={classes.title} >
                      Bienvenido
                    </Typography>
                    <form noValidate autoComplete="off">
                        <div className={classes.field}>
                            <Grid container spacing={1} alignItems="flex-end">
                            <Grid item xs={1}>
                            {<AccountCircleIcon  fontSize="medium" color="primary"/> }
                            </Grid>
                            <Grid item xs={11}>
                            <TextField style={{  width: '100%',marginLeft:'5px' }}  label="Código"  type="text" name="userLogin" required onChange={handleInput} />
                            </Grid>
                            </Grid>
                        </div>
                        <div className={classes.field}>
                            <Grid container spacing={1} alignItems="flex-end">
                            <Grid item xs={1}>
                            {<HttpsIcon  fontSize="medium" color="primary"/> }
                            </Grid>
                            <Grid item xs={11}>
                            <TextField style={{  width: '100%',marginLeft:'5px' }} label="Contraseña"  type="password" name="passLogin" required onChange={handleInput} />
                            </Grid>
                            </Grid>
                        
                        
                        </div>
                        <div>
                        
                        </div>
                        <Button variant="contained" className={classes.btn} endIcon={<ArrowForwardIcon />} onClick={handleSubmit} >Iniciar Sesión</Button>
                    
                    </form> 
                  </Paper>
        </>
    )
}

export default Login