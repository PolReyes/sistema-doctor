import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
        margin:'10px'
    },
    btn:{
        backgroundColor:'#00E1CD',
        margin:'20px',
        color:'#fff'
    }
});


const Login = () => {
    const classes = useStyles();




    return (
        <>
            <Grid container >
              <Grid item md={12} xs={12}>
                  <Paper elevation={3} className={classes.root}>
                  <Typography variant="h4" color="primary" className={classes.title} >
                        Bienvenido
                    </Typography>
                    <form noValidate autoComplete="off">
                        <div>
                        <TextField className={classes.field}  label="Código"  type="text" name="codigoLogin"/>
                        </div>
                        <div>
                        <TextField className={classes.field}  label="Contraseña"  type="password" name="passLogin" />
                        </div>
                        <Button variant="contained" className={classes.btn} endIcon={<ArrowForwardIcon />}>Iniciar Sesión</Button>
                        
                        
                            
                    </form> 
                  </Paper>
                  
              </Grid>
            </Grid>

        </>
    )
}

export default Login