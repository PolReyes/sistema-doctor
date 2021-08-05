import { Grid, Box, TextField, Typography, Button, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'

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
        width: '40%',
        margin:'10px'
    },
    btn:{
        backgroundColor:'#00E1CD',
        margin:'20px',
        color:'#fff'
    }
});

const Form = () => {

    const classes = useStyles();
    const [dataForm, setDataForm] = useState({
        ruc: "",
        concepto: "",
        clavesol: "",
        pass: ""
    });
    
    const handleInput = (event) => {
        const { value, name } = event.target;
        
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };
    
    const handleSubmit = () => {
        //const { userLogin, passLogin } = dataLogin;

        axios.post("http://127.0.0.1:8000/api/registrar",dataForm)
        .then(response => {
            console.log(response)
        });
    };
    return (
        <div>
            <Grid container>
              <Grid item  xs={12}>
              <Box m={2} p={2} boxShadow={3} >
              <Typography variant="h4" className={classes.title}  >
                        Generar Recibo/Factura
                </Typography>
                    <form noValidate autoComplete="off">
                        <div>
                        <TextField className={classes.field}  label="RUC"  type="text" name="ruc" required  onChange={handleInput} />
                        </div>
                        <div>
                        <TextField  className={classes.field}  type="text" name="concepto" value="Atenciones del mes de Julio" required onChange={handleInput} />
                        </div>
                        <div>
                        <TextField  className={classes.field}  label="Clave Sol" type="text" name="clavesol" required onChange={handleInput} />
                        </div>
                        <div>
                        <TextField  className={classes.field} label="Contraseña"  type="password" name="pass" required onChange={handleInput}/>
                        </div>
                        <Button variant="contained" className={classes.btn} onClick={handleSubmit}>Generar</Button>
                    </form> 
              </Box>
              </Grid>
        </Grid>
        </div>
    )
}

export default Form
