import { Grid, Box, TextField, Typography, Button, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';
const useStyles = makeStyles({
    root: {
        maxWidth: 480,
        margin:'auto',
        marginTop: '100px',
        padding: '20px'
      },
    title:{
        color:'#0033A0',
        fontWeight: 'bold',
        textAlign:'Left',
    },

    field:{
        width: '40%',
        margin:'10px'
    },
    btn:{
        backgroundColor:'#00E1CD',
        margin:'20px',
        color:'#fff'
    },
    container:{
      marginTop:'70px',
      padding: '20px',
          width:'100%'
    }
});

const Form = () => {

    const [dataFactura, setDataFactura] = useState({});

    const [dataFacturas, setDataFacturas] = useState([]);

    const [dataPagos, setDataPagos] = useState({});

    const [dataPacientes, setDataPacientes] = useState([]);

    const classes = useStyles();
    const nm = JSON.parse(localStorage.getItem('user'));
    
    const total = parseInt(localStorage.getItem('ttl'));
    const [dataForm, setDataForm] = useState({
        ruc: `${nm.ruc}`,
        concepto: "",
        clavesol: "",
        pass: "",
        monto: total,
    });


    const getConsultas = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/facturas?ruc=${nm.ruc}`)
        setDataFacturas(res.data)
        console.log(res)
        const resp = await axios.get(`http://127.0.0.1:8000/api/montos?doctor=${nm.id_doctor}`)
        setDataPagos(resp.data)

        axios.get(`http://127.0.0.1:8000/api/filtros?doctor=${nm.id_doctor}&tipoEst=pendiente`)
            .then(response => {
                setDataPacientes(response.data)
            console.log(response.data)
            });
      }
    
        useEffect(() => {
          getConsultas();
        },[]);

    
    const handleInput = (event) => {
        const { value, name } = event.target;

        console.log(value)
        
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };
    
    const handleSubmit = () => {
        //const { userLogin, passLogin } = dataLogin;

        setDataForm({
            ...dataForm,
            monto: dataPagos.hasOwnProperty('success') ? dataPagos.total: 0,
        });

        console.log(dataForm)

        axios.post("http://127.0.0.1:8000/api/registrar",dataForm)
        .then(response => {
            console.log(response)
            setDataFactura(response.data)
        });
    };

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    return (
      <div className={classes.container}>
            <Grid container>
              
              <Grid item md={12} xs={12}>
              <Box m={2} p={3} boxShadow={1}>
                  <h3>Pagos pendientes</h3>
                  <hr></hr>
                  <TableContainer >
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Médico</TableCell>
            {/*<TableCell align="right">Cliente</TableCell>*/}
            <TableCell align="right">Fecha atención</TableCell>
            <TableCell align="right">Paciente</TableCell>
            <TableCell align="right">Concepto</TableCell>
            {/*<TableCell align="right">Tipo procedimiento</TableCell>*/}
            {/*<TableCell align="right">Tipo paciente</TableCell>*/}
            {/*<TableCell align="right">Sede</TableCell>*/}
            {/*<TableCell align="right">Proveedor</TableCell>*/}
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {
          dataPacientes?
        dataPacientes.map((row,index) => (
          <>
           <TableRow key={index}>
            <TableCell component="th" scope="row">
            {nm.nombres} {nm.ap_pat} {nm.ap_mat}
            </TableCell>
            {/*<TableCell align="right">{row.tipo_paciente == 'seguro' ? "RIMAC S.A.": ""}</TableCell>*/}
            <TableCell align="right">{row.fecha_atencion}</TableCell>
            <TableCell align="right">{row.paciente}</TableCell>
            <TableCell align="right">{row.tipo_atencion == 'cita' ? "CONSULTA AMBULATORIA": row.tipo_atencion == 'procedimiento' ? "CIRUGIA": ""}</TableCell>
            {/*<TableCell align="right">{row.tipo_atencion}</TableCell>*/}
            {/*<TableCell align="right">{row.tipo_paciente}</TableCell>*/}
            {/*<TableCell align="right">Medicentro</TableCell>*/}
            {/*<TableCell align="right">San Borja</TableCell>*/}
            <TableCell align="right">{row.estado}</TableCell>
            <TableCell align="right">{row.monto}</TableCell>
          </TableRow>
          </>
        )): "Cargando..."
      }
      <TableRow key="last">
            <TableCell colspan="5" component="th" scope="row">
              <b>Total</b>
            </TableCell>
            <TableCell align="right"><b>{ dataPacientes?
        dataPacientes.reduce((sum, value) => (sum + value.monto ), 0)
        : "Cargando..."
      }</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </Box>
            </Grid>   
            <Grid item xs={12}>
              <Box m={2} p={2} boxShadow={1} >
                
              <Typography variant="h5" className={classes.title}  >
              Verifica tus datos
              
                </Typography>
                    <form noValidate autoComplete="off">
                        <div>
                        <TextField className={classes.field}  label="RUC"  type="text" name="ruc" value={nm.ruc} readOnly onChange={handleInput} />
                        </div>
                        <div>
                        <TextField  className={classes.field}  type="text" name="concepto"  required onChange={handleInput} />
                        </div>
                        <div>
                        <TextField  className={classes.field} label="Monto"  type="text" name="monto" value={total} required onChange={handleInput}/>
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
              <Grid item md={12} xs={12}>
        <Box m={2} p={3} boxShadow={1}>
                  <h3>Factura generada</h3>
                  <hr></hr>
                  <TableContainer >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>RUC</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Direccion</TableCell>
                            <TableCell>Concepto</TableCell>
                            <TableCell>Fecha de emisión</TableCell>
                            <TableCell>Monto</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                        dataFactura.hasOwnProperty('monto')?
                        <>
                        <TableRow key={dataFactura.ruc}>
                            <TableCell component="th" scope="row">
                            {dataFactura.ruc}
                            </TableCell>
                            <TableCell>{nm.nombres} {nm.ap_pat} {nm.ap_mat}</TableCell>
                            <TableCell>{nm.direccion}</TableCell>
                            <TableCell>{dataFactura.concepto}</TableCell>
                            <TableCell>{dataFactura.fec_emision}</TableCell>
                            <TableCell>{dataFactura.monto}</TableCell>
                        </TableRow>
                        </>
                        : ""
                    }       
                        </TableBody>
                    </Table>
                 </TableContainer>
                 <Button onClick={handleClick} className={classes.btn} variant="contained">Enviar</Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Factura/Recibo Enviado"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
                </Box>
        <Box m={2} p={3} boxShadow={1}>
                  <h3>Facturas anteriores</h3>
                  <hr></hr>
                  <TableContainer >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>RUC</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Direccion</TableCell>
                            <TableCell>Concepto</TableCell>
                            <TableCell>Fecha de emisión</TableCell>
                            <TableCell>Monto</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                        dataFacturas?
                        dataFacturas.map((row,index) => (
                        <>
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                            {row.ruc}
                            </TableCell>
                            <TableCell>{nm.nombres} {nm.ap_pat} {nm.ap_mat}</TableCell>
                            <TableCell>{nm.direccion}</TableCell>
                            <TableCell>{row.concepto}</TableCell>
                            <TableCell>{row.fec_emision}</TableCell>
                            <TableCell>{row.monto}</TableCell>
                        </TableRow>
                        </>
                        )): "Cargando..."
                    }       
                        </TableBody>
                    </Table>
                 </TableContainer>
                </Box>
                </Grid>

            </Grid>
        </div>
            
    )
}

export default Form
