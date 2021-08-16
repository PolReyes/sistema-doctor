import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory } from "react-router-dom";
import ClearIcon from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../App.css';
import api from '../api';

const useStyles = makeStyles({
    root: {
        maxWidth: 600,
        margin:'auto',
        marginTop: '100px',
        padding: '20px'
      },
    title:{
        textAlign: 'left',
        color:'#0033A0',
        fontWeight: 'bold',
       
    },

    field:{
        width:'100%',
        margin:'10px'
    },
    btn:{
        backgroundColor:'#00E1CD',
        margin:'20px',
        color:'#fff'
    },
    btn2:{
        marginTop:'40px',
        float:'left'
    },
    form:{
        margin:'auto',
        width:'80%',
        //borderColor: '#999',
        //border: '1px solid '
    }
});
function agregarRuc() {
    var w = document.getElementById("campo");
    var x = document.getElementById("div");
    var y = document.getElementById("btnEliminar");
    var z = document.getElementById("btnAgregar");
    
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "none";
       
        
    } else {
        w.value = "";
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
        
    }
}
function eliminarRuc() {
    var w = document.getElementById("campo");
    var x = document.getElementById("div");
    var y = document.getElementById("btnEliminar");
    var z = document.getElementById("btnAgregar");
    
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "none";
       
        
    } else {
        w.value = "";
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
        
    }
}
const Actualizar = () => {
    const classes = useStyles();

    const [dataUpdate, setDataUpdate] = useState({});

    const [openAlertSend, setOpenAlertSend] = useState(false);
    const [openAlertError, setOpenAlertError] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  
      const handleInput = (event) => {
        const { value, name } = event.target;
        
        setDataUpdate({
            ...dataUpdate,
            [name]: value,
        });
      };
      let history = useHistory();

      const handleCloseAlertSend = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlertSend(false);
      };

      const handleCloseAlertError = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlertError(false);
      };

      const handleSubmit = (e) => {
          
          e.preventDefault()
          //console.log(e)
        axios.post(`http://${api}/api/actruc`,dataUpdate)
        .then(response => {
            //console.log(dataUpdate);
            if(response.data!="Error"){
                setOpenAlertSend(true);
                e.target.reset();
            }else{
                setOpenAlertError(true);
            }
            //history.push("/home");
        });
        
    };
    const [titulo,setTitulo] = React.useState("");
    const [leyenda,setLeyenda] = React.useState("");
    const [errorTitulo, setErrorTitulo]= React.useState(false);

    return (
        <>
            <Grid container >
              <Grid item md={12} xs={12}><br></br><br></br>
                  <Paper elevation={2} className={classes.root}>
                  
                    <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                    
                    <Typography  variant="h5" color="primary" className={classes.title} >
                    {<InfoIcon style={{  verticalAlign: 'middle' }} fontSize="large"/> } Actualiza tus datos 
                    </Typography>
                        {/*
                        <div id="btnEliminar" style={{display:"none"}}>
                        <Button   className={classes.btn2} color="primary"  onClick={agregarRuc} endIcon={<ClearIcon/>}>Eliminar RUC</Button>
                        </div>
                        <div id="btnAgregar">
                        <Button  className={classes.btn2} color="primary"  onClick={eliminarRuc} endIcon={<AddIcon/>}>Agregar RUC</Button>
                        </div>
                        */}
                        {/*<div id="div" style={{display:"none"}} >*/}
                        <div>
                        <TextField id="campo" className={classes.field}  label="RUC"  type="text" name="ruc"  required onChange={handleInput} 
                        inputProps={{maxlength:11}} 
                        onKeyUp=
                        {(e)=>{
                            setTitulo(e.target.value)
                            let regex = new RegExp(/^[0-9]+$/);

                            if(!regex.test(e.target.value) || !e.target.value === " "){
                                //e.target.value = e.target.value.substring(0, e.target.value.length - 1)
                                setErrorTitulo(true);
                                setLeyenda("RUC solo puede contener números")
                                //console.log("caracter")
                            }else{
                                setErrorTitulo(false);
                                setLeyenda("");
                                //console.log("numero")
                            }
                        }}
                        error={errorTitulo}
                        helperText={leyenda}
                        variant="outlined"/>
                        </div>
                        <div>
                        <TextField className={classes.field}  label="Usuario SUNAT" type="text" name="usuariosunat" required onChange={handleInput} 
                         inputProps={{maxlength:8}} 
                         variant="outlined" />
                        </div>
                        <div>
                        <TextField  className={classes.field} label="Contraseña SUNAT"  type="password" name="clavesunat" required onChange={handleInput}
                         inputProps={{maxlength:12}} 
                         variant="outlined" />
                        </div>
                        <Button variant="contained" className={classes.btn} type="submit" endIcon={<SaveIcon/>} >Guardar</Button>
                    </form>
                    <Snackbar open={openAlertSend} autoHideDuration={6000} onClose={handleCloseAlertSend}>
                        <Alert onClose={handleCloseAlertSend} severity="success">
                            Información actualizada
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openAlertError} autoHideDuration={6000} onClose={handleCloseAlertError}>
                        <Alert onClose={handleCloseAlertError} severity="error">
                            RUC incorrecto
                        </Alert>
                    </Snackbar>
                  </Paper>    
              </Grid>
            </Grid>
        </>
    )
}

export default Actualizar
