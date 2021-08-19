import React from 'react';
import { useState } from "react";
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
import axios from 'axios';
import { useHistory } from "react-router-dom";
import api from '../api';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useForm, Controller, FormProvider, useFormContext} from "react-hook-form";
import Clear from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '100px',
        margin: 'auto',
        width: '100%',
    },
    button: {
      marginTop:'10px',
      marginBottom:'10px',
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
    //return ['Verificacion','Datos personales', 'Datos sunat', 'Datos de usuario'];
    return ['Identificación','Verificación','Datos personales', 'Datos SUNAT'];
  }
  
  const DatosForm = ({dataRegister}) => {
    const {
      control, setValue,
      formState: { errors },
    } = useFormContext();


    //console.log(errors);
    return (   
      <>
      {/*console.log("Reg",dataRegister)*/}
      <Grid container>
        <Grid item md={12} xs={12} style={{width:"100%",margin:"auto"}}>
          <Typography variant="h5" color="primary">
            <strong>Datos personales</strong> 
          </Typography>
          <Box m={0} p={1} boxShadow={0}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="nombres"
                  rules={{
                    //required: true,
                    required: "Campo nombre requerido.",
                    pattern: {
                      value: /^([A-Za-z][A-Za-z'-])+([A-Za-z][A-Za-z'-]+)*/,
                      message: "Nombre no puede contener números"
                    }
                  }}
                  render={({ field }) => (
                    <TextField  style={{margin:"10px",width:"90%"}}
                      //onChange={handleInput}
                      id="first-name"
                      label="Apellidos y nombres"
                      variant="outlined"
                      placeholder="Ingrese sus apellidos y nombres"
                      disabled
                      margin="dense"                      
                      //inputProps={{defaultValue:dataRegister.APELLIDOS_NOMBRES}}
                      //value={dataRegister.APELLIDOS_NOMBRES}
                      {...field}
                      error={Boolean(errors?.nombres)}
                      helperText={
                        //errors.nombre && errors.nombre.message
                        //errors?.nombre?.type === "required" && <p>Campo nombre requerido.</p>,
                        errors.nombres?.message
                        //errors?.nombre?.type === "pattern" && <p>Nombre no puede contener números</p>
                      }
                    />
                  )}
                />
                {/*setValue("nombres",dataRegister?dataRegister.APELLIDOS_NOMBRES:"")*/}
              </Grid>
              {/*
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="appat"
                  rules={{ 
                    required: "Campo apellido paterno es requerido." ,
                    pattern: {
                      value:/^[A-Za-z]+$/i,
                      message: "Apellido Paterno no puede contener números"
                    }
                  }}
                  render={({ field }) => (
                    <TextField  style={{margin:"10px",width:"90%"}}
                      //onChange={handleInput}
                      id="last-name"
                      label="Apellido Paterno"
                      variant="outlined"
                      placeholder="Ingrese su apellido paternp"
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.appat)}
                      helperText={errors.appat?.message}
                    />
                  )}
                />
                  </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} xs={12} >
                <Controller
                  control={control}
                  name="apmat"
                  rules={{ 
                    required: "Campo apellido materno es requerido.",
                    pattern: {
                      value:/^[A-Za-z]+$/i,
                      message: "Apellido Materno no puede contener números"
                    }
                  }}
                  render={({ field }) => (
                    <TextField style={{margin:"10px",width:"90%"}}
                      //onChange={handleInput}
                      id="ape-naterno"
                      label="Apellido Materno"
                      variant="outlined"
                      placeholder="Ingrese apellido materno"
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.apmat)}
                      helperText={errors.apmat?.message}
                    /> 
                  )}
                />
                  </Grid>*/}
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="dni"
                  rules={{  
                    required: "Campo dni es requerido.",
                    pattern: {
                      value:/^[0-9]+$/i,
                      message: "Dni debe contener 8 dígitos"
                    },
                    //maxLength:8 
                  }}
                  render={({ field }) => (
                    <TextField style={{margin:"10px",width:"90%"}}
                      //onChange={handleInput}
                      inputProps={{maxlength:8}}
                      id="dni"
                      label="Dni"
                      variant="outlined"
                      disabled
                      placeholder="Ingrese dni"
                      variant="outlined"
                      margin="dense"
                      //value={dataRegister.DNI}
                      {...field}
                      error={Boolean(errors?.dni)}
                      helperText={errors.dni?.message}
                    />
                  )}
                />
                {/*setValue("dni",dataRegister.DNI)*/}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} xs={12} >
                <Controller
                  control={control}
                  name="correo"
                  rules={{ 
                    required: "Campo correo es requerido.",
                    pattern: {
                      value:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                      message: "Ingrese email válido"
                    }
                  }}
                  render={({ field }) => (
                    <TextField style={{margin:"10px",width:"90%"}}
                      //onChange={handleInput}
                      id="correo"
                      label="Correo"
                      variant="outlined"
                      placeholder="Ingrese correo electrónico"
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.correo)}
                      helperText={errors.correo?.message}
                    />
                  )}
                />
                {/*setValue("correo",dataRegister.CORREO)*/}
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="telefono"
                  rules={{ 
                    required: "Campo teléfono es requerido.",
                    pattern: {
                      value:/^[0-9]+$/i,
                      message: "Dni debe contener 9 dígitos"
                    }
                  }}
                  render={({ field }) => (
                    <TextField style={{margin:"10px",width:"90%"}}
                      //onChange={handleInput}
                      inputProps={{maxlength:9}}
                      id="telefono"
                      label="Teléfono"
                      variant="outlined"
                      placeholder="Ingrese teléfono"
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.telefono)}
                      helperText={errors.telefono?.message}
                    />
                  )}
                />
                {/*setValue("telefono",dataRegister.TELEFONO)*/}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} xs={12} >
                <Controller
                  control={control}
                  name="direccion"
                  rules={{ 
                    required: "Campo dirección es requerido.",
                  }}
                  render={({ field }) => (
                    <TextField style={{margin:"10px",width:"90%"}}
                      //onChange={handleInput}
                      inputProps={{maxlength:100}}
                      id="direccion"
                      label="Dirección"
                      variant="outlined"
                      placeholder="Ingrese dirección"
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.direccion)}
                      helperText={errors.direccion?.message}
                    />
                  )}
                />
                {/*setValue("direccion",dataRegister.DIRECCION)*/}
              </Grid>
              {/*
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="especialidad"
                  rules={{ required: "Campo especialidad es requerido.",
                    pattern: {
                      value:/^[A-Za-z]+$/i,
                      message: "Especialidad no puede contener números"
                    }
                  }}
                  render={({ field }) => (
                    <TextField style={{margin:"10px",width:"90%"}}
                      //onChange={handleInput}
                      inputProps={{maxlength:20}}
                      id="especialidad"
                      label="Especialidad"
                      variant="outlined"
                      placeholder="Ingrese especialidad"
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.especialidad)}
                      helperText={errors.especialidad?.message}
                    />
                  )}
                />
                  </Grid>*/}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      </>
    );
  };
  const SunatForm = () => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    return (
      <>
      <Grid container>
        <Grid item md={12} xs={12} style={{width:"100%",margin:"auto"}}>
          <Typography variant="h5" color="primary">
            <strong>Datos SUNAT</strong> 
          </Typography>
          <Box m={0} p={1} boxShadow={0}>
            <Grid container>
              <Grid item md={6} xs={12} style={{margin:'auto'}}>
                <Controller
                  control={control}
                  name="ruc"
                  //value={dataRegister.ruc}
                  rules={{ 
                    required: "Campo ruc es requerido.",
                    pattern: {
                      value:/^[0-9]+$/i,
                      message: "Ruc debe contener 11 dígitos"
                    }
                  }}
                  render={({ field }) => (
                    <TextField  
                      //onChange={handleInput}
                      fullWidth
                      inputProps={{maxlength:11}} 
                      id="ruc"
                      label="RUC"
                      variant="outlined"
                      placeholder="Ingrese ruc"
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.ruc)}
                      helperText={errors.ruc?.message}
                    />
                  )}
                />
              </Grid>
            </Grid> 
            <Grid container>
              <Grid item md={6} xs={12} style={{margin:'auto'}}>
                <Controller
                  control={control}
                  name="usrsunat"
                  //value={dataRegister.clavesol}
                  rules={{ required: "Campo usuario es requerido." }}
                  render={({ field }) => (
                    <TextField
                      //onChange={handleInput}
                      inputProps={{maxlength:8}}
                      id="usrsunat"
                      label="Usuario SUNAT"
                      variant="outlined"
                      placeholder="Ingrese su usuario"
                      fullWidth
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.usrsunat)}
                      helperText={errors.usrsunat?.message}
                    />
                  )}
                />
              </Grid>
            </Grid> 
            <Grid container>
              <Grid item md={6} xs={12} style={{margin:'auto'}} >
                <Controller
                  control={control}
                  name="clavesunat"
                  //value={dataRegister.solpass}
                  rules={{ required: "Campo contraseña es requerido." }}
                  render={({ field }) => (
                    <TextField
                      //onChange={handleInput}
                      inputProps={{maxlength:12}}
                      type="password"
                      id="clavesunat"
                      label="Contraseña"
                      variant="outlined"
                      placeholder="Ingrese su contraseña"
                      fullWidth
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.clavesunat)}
                      helperText={errors.clavesunat?.message}
                    />
                  )}
                /><br/>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      </>
    );
  };

  const UsuarioForm = () => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    return (
      <>
      <Grid container>
        <Grid item md={12} xs={12} style={{width:"100%",margin:"auto"}}>
          <Typography variant="h5" color="primary">
            <strong>Datos SUNAT</strong> 
          </Typography>
          <Box m={0} p={1} boxShadow={0}>
            <Grid container>
              <Grid item md={6} xs={12} style={{margin:'auto'}}>
                <Controller
                  control={control}
                  name="usuario"
                  //value={dataRegister.usuario}
                  rules={{ required: "Campo usuario es requerido." }}
                  render={({ field }) => (
                    <TextField
                      //onChange={handleInput}
                      inputProps={{maxlength:8}}
                      id="user"
                      label="Usuario"
                      variant="outlined"
                      placeholder="Ingrese usuario"
                      fullWidth
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.usuario)}
                      helperText={errors.usuario?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6} xs={12} style={{margin:'auto'}}>
                <Controller
                  control={control}
                  name="pass"
                  //value={dataRegister.pass}
                  rules={{ required: "Campo contraseña es requerido." }}
                  render={({ field }) => (
                    <TextField
                      //onChange={handleInput}
                      inputProps={{maxlength:12}}
                      type="password"
                      id="clave"
                      label="Contraseña"
                      variant="outlined"
                      placeholder="Ingrese contraseña"
                      fullWidth
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.clave)}
                      helperText={errors.clave?.message}
                    />
                  )}
                /><br></br>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      </> 
    );
  };

  const IdentificacionForm = () => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    return (
      <>
      <Grid container>
        <Grid item md={12} xs={12} style={{width:"100%",margin:"auto"}}>
          <Typography variant="h5" color="primary">
            <strong>Identificación de usuario</strong> 
          </Typography>
          <Box m={0} p={1} boxShadow={0} >
          <Grid container>
              <Grid item md={4} xs={12} style={{margin:'auto'}}>
                <Controller
                  control={control}
                  name="userLogin"
                  //value={dataRegister.usuario}
                  rules={{ required: "Campo DNI es requerido." }}
                  render={({ field }) => (
                    <TextField
                      //onChange={handleInput}
                      inputProps={{maxlength:8}}
                      id="checkdni"
                      label="DNI"
                      variant="outlined"
                      //value={10}
                      placeholder="Ingresar DNI"
                      fullWidth
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.userLogin)}
                      helperText={errors.userLogin?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/*
            <Grid container>
              <Grid item md={4} xs={12} style={{margin:'auto'}}>
              <Controller
                  control={control}
                  name="phoneCode"
                  rules={{ 
                    //required: "Campo celular es requerido.",
                    pattern: {
                      value:/^[0-9]+$/i,
                      message: "Celular debe contener 9 dígitos"
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      //onChange={handleInput}
                      inputProps={{maxlength:9}}
                      id="checkphone"
                      label="Celular"
                      variant="outlined"
                      placeholder="Ingresar celular"
                      margin="dense"
                      disabled
                      fullWidth
                      {...field}
                      error={Boolean(errors?.phoneCode)}
                      helperText={errors.phoneCode?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
                  */}


          </Box>
        </Grid>
      </Grid>
      </> 
    );
  };



  const VerificacionForm = () => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    return (
      <>
      <Grid container>
        <Grid item md={12} xs={12} style={{width:"100%",margin:"auto"}}>
          <Typography variant="h5" color="primary">
            <strong>Verificacion de identidad</strong> 
          </Typography>
          <Box m={0} p={1} boxShadow={0} >
          <Grid container>
              <Grid item md={4} xs={12} style={{margin:'auto'}}>
                <Controller
                  control={control}
                  name="userLogin"
                  //value={dataRegister.usuario}
                  rules={{ required: "Campo DNI es requerido." }}
                  render={({ field }) => (
                    <TextField
                      //onChange={handleInput}
                      inputProps={{maxlength:8}}
                      id="checkdni"
                      label="DNI"
                      variant="outlined"
                      placeholder="Ingresar DNI"
                      fullWidth
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.userLogin)}
                      helperText={errors.userLogin?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={4} xs={12} style={{margin:'auto'}}>
                <Controller
                  control={control}
                  name="passLogin"
                  //value={dataRegister.pass}
                  rules={{ required: "Campo Clave SMS es requerido." }}
                  render={({ field }) => (
                    <TextField
                      //onChange={handleInput}
                      inputProps={{maxlength:6}}
                      type="text"
                      id="passLogin"
                      label="Clave SMS"
                      variant="outlined"
                      placeholder="Ingresar Clave SMS"
                      fullWidth
                      margin="dense"
                      {...field}
                      error={Boolean(errors?.passLogin)}
                      helperText={errors.passLogin?.message}
                    />
                  )}
                /><br></br>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      </> 
    );
  };

  function getStepContent(step, dataRegister) {
    switch (step) {
      case 0:
        return <IdentificacionForm />
      case 1:
        return <VerificacionForm />
    {/*return (
          <Grid container>
            <Grid item md={12} xs={12} style={{width:"100%",margin:"auto"}}>
            <Typography variant="h5" color="primary">
               <strong>Datos personales</strong> 
            </Typography>
            <Box m={0} p={3} boxShadow={0}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <TextField  style={{width:"90%",margin:"10px"}} margin="dense" label="Nombres" type="text" name="nombres" 
                 inputProps={{maxlength:50}} 
                  rules={{
                    required: true,
                  }}
                 variant="outlined"/> 
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField style={{width:"90%",margin:"10px"}} margin="dense" label="Apellido Paterno" type="text" name="appat" 
                error
                helperText="Incorrect entry."
                onChange={handleInput} 
                variant="outlined" />
              </Grid>
              </Grid>

               <Grid container>
               
              <Grid item md={6} xs={12}>
              <TextField style={{width:"90%",margin:"10px"}} margin="dense" label="Apellido Materno"  margin="dense" type="text" name="apmat" 
              error
              helperText="Incorrect entry."
              onChange={handleInput} 
              variant="outlined" />
              </Grid>
              <Grid item md={6} xs={12}>
              <TextField style={{width:"90%",margin:"10px"}} margin="dense" label="Dni" type="text"  margin="dense" name="dni" 
              error
              helperText="Incorrect entry."
              onChange={handleInput} 
              variant="outlined" />
              </Grid>
              </Grid> 

              <Grid container>
              <Grid item md={6} xs={12}>
              <TextField style={{width:"90%",margin:"10px"}} margin="dense" label="Correo" type="text" name="correo" 
              error
              helperText="Incorrect entry."
              onChange={handleInput} 
              variant="outlined" />
              </Grid>
              <Grid item md={6} xs={12}>
              <TextField style={{width:"90%",margin:"10px"}} margin="dense" label="Teléfono" type="text" name="telefono" 
              error
              helperText="Incorrect entry."
              onChange={handleInput} 
              variant="outlined" />
              </Grid>
              </Grid> 
              <Grid container>
              <Grid item md={6} xs={12}>
              <TextField style={{width:"90%",margin:"10px"}} margin="dense" label="Dirección" type="text" name="direccion" 
             error
             helperText="Incorrect entry."
             onChange={handleInput} 
             variant="outlined" />
              </Grid>
              <Grid item md={6} xs={12}>
              <TextField style={{width:"90%",margin:"10px"}} margin="dense" label="Especialidad" type="text" name="especialidad" 
              error
              helperText="Incorrect entry."
              onChange={handleInput} 
              variant="outlined" />
              </Grid>
              </Grid> 
            </Box>
            </Grid>
          </Grid>
        );*/ }
      case 2:
        console.log("DTR ",dataRegister)
        return <DatosForm dataRegister={dataRegister}/>;
        {/* return ( 
            <Box Box m={2} p={2} boxShadow={0}>
            <Typography variant="h6" color="primary">
                Datos de Factura/Recibo
            </Typography>
            
            <div id="btnEliminar" style={{display:"none"}}>
            <Button  color="primary" onClick={agregarRuc} endIcon={<ClearIcon/>}>Eliminar RUC</Button>
            </div>
            <div id="btnAgregar">
            <Button   color="primary" onClick={eliminarRuc} endIcon={<AddIcon/>}>Agregar RUC</Button>
            </div>*/}
            
            {/*<div id="div" style={{display:"none"}} >
            <div>
            <TextField id="campo"   label="RUC"  type="text" name="ruc" value={dataRegister.ruc} required onChange={handleInput} />
            </div>
            <div>
            <TextField    label="Clave Sol" type="text" name="clavesol" value={dataRegister.clavesol} required onChange={handleInput} />
            </div>
            <div>
            <TextField   label="Contraseña"  type="password" name="solpass" value={dataRegister.solpass} required onChange={handleInput} />
            </div>
            </Box>
            );*/}
      case 3:
        //return <UsuarioForm/>
        return <SunatForm/>
        {/*return (
            <Box Box m={2} p={2} boxShadow={0}>
            <Typography variant="h6" color="primary">
                Datos de usuario
            </Typography>
            
            <div>
            <TextField    label="Usuario" type="text" name="usuario" value={dataRegister.usuario} required onChange={handleInput} />
            </div>
            <div>
            <TextField   label="Contraseña"  type="password" name="pass" value={dataRegister.pass} required onChange={handleInput} />
            </div>
            </Box>
        );*/}
      default:
        return 'Unknown step';
    }
  }

const Register = () => {
  const methods = useForm({
    defaultValues: {
      nombres: "",
      appat: "",
      apmat: "",
      dni: "",
      correo: "",
      telefono: "",
      direccion: "",
      especialidad: "",
      ruc: "",
      clavesol: "",
      solpass: "",
      passLogin: ""
    },
  });

  const [isValidated, getIsValidated] = useState(false);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepFailed = ()=>{
    return Boolean(Object.keys(methods.formState.errors).length)
  }
  
  const [dataRegister, setDataRegister] = useState({});

  const [dataCode, setDataCode] = useState({});

  const handleCode = (data) => {
    axios.post(`http://${api}/api/getcode`,data)
    .then(response => {
        console.log(response.data);
        setOpenAlertCode(true);
        methods.setValue("passLogin",response.data)
    });
  }

  const handleGet = (data) => {
    axios.post(`http://${api}/api/login`,data)
    .then(response => {
        console.log("Datos doctor: ",response.data);
        if(response.data!=='Error'){
          setDataRegister(response.data);
          methods.setValue("nombres",response.data.APELLIDOS_NOMBRES)
          methods.setValue("dni",response.data.DNI)
          methods.setValue("correo",response.data.CORREO)
          methods.setValue("telefono",response.data.TELEFONO)
          methods.setValue("direccion",response.data.DIRECCION)
        }else{
          setOpenAlertLogin(true);
        }
    });
  }

  let history = useHistory();

  const steps = getSteps();
  
  const isStepOptional = (step) => {
    return step === 1;
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const [openAlertCode, setOpenAlertCode] = useState(false);
const [openAlertLogin, setOpenAlertLogin] = useState(false);

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
  
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  

  const handleNext = (data) => {
    
    console.log(data);

    if(activeStep===0){
      handleCode(data)
    }
    if(activeStep===1){
      handleGet(data);
      //methods.setValue("nombres",dataRegister?dataRegister.APELLIDOS_NOMBRES)
    }

    if(activeStep === steps.length - 1){
      handleSubmit(data)
    }
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
    //setActiveStep(0);
    history.push("/");
  };

  const handleSubmit = (data) => {
    //const dataLogin = '';
    axios.post(`http://${api}/api/registrar`,data)
    .then(response => {
      //console.log(response.data);
      //localStorage.setItem("user",JSON.stringify(response.data));  
      //console.log(typeof(response.data));
      //const rsp = response.data
      //setUsuario(response.data);
      //setUsuario(rsp);
      //console.log(usuario);
      //<Home usuario={response.data} />
      console.log(dataRegister);
        //history.push("/");
          //<Redirect to="/Home"></Redirect>;
    });
  };

  return (
    <div className="App">
      <Grid container>       
        <Grid item md={6} xs={12} className={classes.root}>
          <Box m={0} p={2} boxShadow={0} style={{backgroundColor:'#fff'}}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = <Typography variant="caption"></Typography>;
                }
                if (isStepFailed() && activeStep == index){
                  labelProps.error= true;
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
                    Has finalizado tu registro.
                  </Typography>
                  <Button onClick={handleReset} className={classes.button} variant="contained" color="primary">
                    Iniciar sesión
                  </Button>
                </div>
              ) : (
                <>
                <FormProvider {...methods}>
                  <form autoComplete="off" onSubmit={methods.handleSubmit(handleNext)}>
                    {getStepContent(activeStep, dataRegister)}
                    
                    <Button
                    variant="contained"
                      className={classes.button}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      color="primary"
                    >
                      Atrás
                    </Button> 
                    
                    {/*{isStepOptional(activeStep) && (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                      >
                        skip
                      </Button>
                    )}*/}
                    {
                    activeStep === steps.length - 1 ? 
                      <Button
                        variant="contained"
                        color="primary"
                        //onClick={handleSubmit}
                        className={classes.button}
                        type="submit"
                      >
                        Registrar
                      </Button> : activeStep === 0 ?
                      <Button
                      variant="contained"
                      color="primary"
                      //onClick={handleCode}
                      className={classes.button}
                      type="submit"
                    >
                      Clave SMS
                    </Button> : activeStep === 1 ?
                      <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                    >
                      Obtener datos
                    </Button> : 
                      <Button
                        variant="contained"
                        color="primary"
                        //onClick={handleNext}
                        className={classes.button}
                        type="submit"
                      >
                        Siguiente
                    </Button>
                    }
                  </form>
                </FormProvider>
                </>
              )}
              {/* <div>
                  <Typography className={classes.instructions}>{getStepContent(activeStep, handleInput, dataRegister)}</Typography>
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button} variant="contained" color="primary">
                      Atrás
                    </Button> 

                    {/*<Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
                    </Button>

                      {activeStep === steps.length - 1 ?
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className={classes.button}
                      >
                      Confirmar
                      </Button>
                    : 
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                    Siguiente
                    </Button>
                    }

                  </div>
                  </div> */}
            </div>
          </Box>
          <Snackbar open={openAlertCode} autoHideDuration={6000} onClose={handleCloseAlertCode}>
                        <Alert onClose={handleCloseAlertCode} severity="info">
                            Ingrese el código SMS enviado como contraseña
                        </Alert>
                    </Snackbar>
          <Snackbar open={openAlertLogin} autoHideDuration={6000} onClose={handleCloseAlertLogin}>
              <Alert onClose={handleCloseAlertLogin} severity="error">
                Clave SMS incorrecta
              </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </div>        
  )
}

export default Register;
