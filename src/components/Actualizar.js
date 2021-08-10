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
import '../App.css';

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
  
      const handleInput = (event) => {
        const { value, name } = event.target;
        
        setDataUpdate({
            ...dataUpdate,
            [name]: value,
        });
      };
      let history = useHistory(); 

      const handleSubmit = () => {
        axios.post("http://147.182.244.196:8080/api/actruc",dataUpdate)
        .then(response => {
            console.log(dataUpdate);
            console.log(response);
            history.push("/home");
        });
        
    };

    return (
        <>
            <Grid container >
              <Grid item md={12} xs={12}><br></br><br></br>
                  <Paper elevation={2} className={classes.root}>
                  
                    <form className={classes.form} noValidate autoComplete="off">
                    
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
                        <TextField id="campo" className={classes.field}  label="RUC"  type="text" name="ruc"  required onChange={handleInput} />
                        </div>
                        <div>
                        <TextField  className={classes.field}  label="Clave Sol" type="text" name="clavesol" required onChange={handleInput} />
                        </div>
                        <div>
                        <TextField  className={classes.field} label="Contraseña"  type="password" name="solpass" required onChange={handleInput} />
                        </div>
                        <Button variant="contained" className={classes.btn} onClick={handleSubmit} endIcon={<SaveIcon/>} >Guardar</Button>
                    </form> 
                  </Paper>    
              </Grid>
            </Grid>
        </>
    )
}

export default Actualizar
