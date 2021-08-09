import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { Box, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '100px',
        margin: 'auto',
        width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
      backgroundColor:'#00E1CD',
        color:'#fff'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    bgColor:{
        backgroundColor: '#fff'
    }
  }));
  function getSteps() {
    return ['Datos personales', 'Datos sunat', 'Datos de usuario'];
  }
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
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (<Box Box m={4} p={2} boxShadow={0}>
            <Typography variant="h6" color="primary">
                Datos personales
            </Typography>
                <div>
                <TextField label="Nombre" type="text" name="nombre" required />
                </div>
                <div>
                <TextField label="Apellido" type="text" name="apellido" required />
                </div>
                <div>
                <TextField label="Correo" type="text" name="correo" required />
                </div>
                <div>
                <TextField label="Teléfono" type="text" name="teléfono" required />
                </div>
                </Box>);
      case 1:
        return ( 
            <Box Box m={4} p={2} boxShadow={0}>
            <Typography variant="h6" color="primary">
                Datos de Factura/Recibo
            </Typography>
            <div id="btnEliminar" style={{display:"none"}}>
            <Button  color="primary" onClick={agregarRuc} endIcon={<ClearIcon/>}>Eliminar RUC</Button>
            </div>
            <div id="btnAgregar">
            <Button   color="primary" onClick={eliminarRuc} endIcon={<AddIcon/>}>Agregar RUC</Button>
            </div>
            
            <div id="div" style={{display:"none"}} >
            <TextField id="campo"   label="RUC"  type="text" name="ruc"  required/>
            </div>
            <div>
            <TextField    label="Clave Sol" type="text" name="clavesol" required />
            </div>
            <div>
            <TextField   label="Contraseña"  type="password" name="pass" required />
            </div>
            </Box>
            );
      case 2:
        return (
            <Box Box m={4} p={2} boxShadow={0}>
            <Typography variant="h6" color="primary">
                Datos de usuario
            </Typography>
            
            <div>
            <TextField    label="Usuario" type="text" name="usuario" required />
            </div>
            <div>
            <TextField   label="Contraseña"  type="password" name="pass" required />
            </div>
            </Box>
        );
      default:
        return 'Unknown step';
    }
  }

const Inicio = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();
  
    const isStepOptional = (step) => {
      return step === 1;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
    return (
        <div className="App">
        <Grid container>
              
              <Grid item md={9} xs={12} className={classes.root}>
                <Box m={0} p={2} boxShadow={0} style={{backgroundColor:'#fff'}}>

         <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption"></Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button} variant="contained" color="primary">
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button} variant="contained" color="primary">
                Atrás
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
              </Button>
            </div>
          </div>
        )}
      </div>
                </Box>
           
            </Grid>
            </Grid>
        
        </div>
        
    )
}

export default Inicio
