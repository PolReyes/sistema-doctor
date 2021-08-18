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
import { DataGrid } from '@material-ui/data-grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MuiAlert from '@material-ui/lab/Alert';
import api from '../api';

const useStyles = makeStyles((theme) => ({
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
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
     //border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Form = () => {

  const [importe, setImporte] = useState(0)
  //let subtotal = 0.0;

    const [dataFactura, setDataFactura] = useState({});

    const [dataFacturas, setDataFacturas] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);

    let ids = [];

    const [dataPagos, setDataPagos] = useState({});

    const [dataPacientes, setDataPacientes] = useState([]);

    const classes = useStyles();
    const nm = JSON.parse(localStorage.getItem('user'));
    
    const total = parseInt(localStorage.getItem('ttl'));
    const [dataForm, setDataForm] = useState({
        ruc: `${nm.RUC}`,
        concepto: "Servicios médicos",
        clavesol: "",
        pass: "",
        monto: parseFloat(importe)
    });

    const getFacturas = () => {
      axios.get(`http://${api}/api/facturas?ruc=${nm.RUC}`)
        .then(response => {
          setDataFacturas(response.data);
        });
    }


    const getConsultas = async () => {
      getFacturas()
        const resp = await axios.get(`http://${api}/api/montos?doctor=${nm.ID_DOCTOR}`)
        setDataPagos(resp.data)

        axios.get(`http://${api}/api/filtros?doctor=${nm.ID_DOCTOR}&tipoEst=pendiente`)
            .then(response => {
                setDataPacientes(response.data)
            console.log(response.data)
        });
      }
    
        useEffect(() => {
          getConsultas();
        },[]);

        /*useEffect(() => {
          getFacturas();
        },[dataFacturas]);*/

    
    const handleInput = (event) => {
        const { value, name } = event.target;

        console.log(value)
        
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };
    
    const handleSubmit = (e) => {
        //const { userLogin, passLogin } = dataLogin;
        e.preventDefault();
        console.log(dataForm);

        axios.post(`http://${api}/api/registrofact`,dataForm)
        .then(response => {
            console.log(response);
            setDataFactura(response.data);
            setOpenAlert(true);
            e.target.reset();
            setImporte(0);
            setDataForm({
              ...dataForm,
              monto: parseFloat(0),
            });
            setSelectionModel([]);
            handleClose();
            getFacturas();
        });
    };

    
      const columns = [
        { id: 'id', headerName: 'ID', width: 50 },
        { field: 'nombre_medico', headerName: 'Médico', width: 200 },
        {
          field: 'paciente',
          headerName: 'Paciente',
          width: 200,
          editable: false,
          sortable: false,
        },
        {
          field: 'fecha_atencion',
          headerName: 'Fecha atención',
          width: 150,
          editable: false,
          sortable: false,
        },
        {
          field: 'concepto',
          headerName: 'Concepto',
          width: 250,
          editable: false,
          sortable: false,
        },
        {
          field: 'estado',
          headerName: 'Estado',
          width: 120,
          editable: false,
          sortable: false,
        },
        {
          field: 'importe_total',
          headerName: 'Monto',
          width: 120,
          editable: false,
        },
      ];

      const columnsList = [
        { id: 'id', headerName: 'ID', width: 50 },
        { field: 'nom_doctor', headerName: 'Médico', width: 300 },
        {
          field: 'ruc',
          headerName: 'RUC',
          width: 150,
          editable: false,
          sortable: false,
        },
        {
          field: 'concepto',
          headerName: 'Concepto',
          width: 250,
          editable: false,
          sortable: false,
        },
        {
          field: 'fec_emision',
          headerName: 'Fecha de emision',
          width: 200,
          editable: false,
          sortable: false,
        },
        {
          field: 'monto',
          headerName: 'Monto',
          width: 150,
          editable: false,
        },
      ];
      
      const rows = [
        { id:1,medico: 'Ruby Reynolds Ellis', cliente: 'HIDALGO MILLA YOLANDA OLINDA', atencion: '4/05/2021',concepto: 'cita', monto: 35 },
        { id:2,medico: 'Ruby Reynolds Ellis', cliente: 'MENDOZA ALBIS MIRTHA CAROLINA', atencion: '4/05/2021',concepto: 'cita', monto: 105 },
        { id:3,medico: 'Ruby Reynolds Ellis', cliente: 'MORENO SOLORZANO DEYSI', atencion: '4/05/2021',concepto: 'Jon', monto: 55 },
        { id:4,medico: 'Ruby Reynolds Ellis', cliente: 'ORELLANA ORIHUELA MARIBEL BENI', atencion: '4/05/2021',concepto: 'cita', monto: 85 },
        { id:5,medico: 'Ruby Reynolds Ellis', cliente: 'ORELLANA ORIHUELA MARIBEL BENI', atencion: '4/05/2021',concepto: 'cita', monto: 75 },
        { id:6,medico: 'Ruby Reynolds Ellis', cliente: 'HIDALGO MILLA YOLANDA OLINDA', atencion: '4/05/2021',concepto: 'cita', monto: 35 },
        { id:7,medico: 'Ruby Reynolds Ellis', cliente: 'MENDOZA ALBIS MIRTHA CAROLINA', atencion: '4/05/2021',concepto: 'cita', monto: 45 },
        { id:8,medico: 'Ruby Reynolds Ellis', cliente: 'MORENO SOLORZANO DEYSI', atencion: '4/05/2021',concepto: 'Jon', monto: 60 },
        { id:9,medico: 'Ruby Reynolds Ellis', cliente: 'ORELLANA ORIHUELA MARIBEL BENI', atencion: '4/05/2021',concepto: 'cita', monto: 35 },
        { id:10,medico: 'Ruby Reynolds Ellis', cliente: 'ORELLANA ORIHUELA MARIBEL BENI', atencion: '4/05/2021',concepto: 'cita', monto: 35 },
      ];

const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    console.log(importe)
    console.log(dataForm.monto)
    if(dataForm.monto == importe){
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const [openAlert, setOpenAlert] = React.useState(false);

  /*const handleClick = (e) => {
    handleSubmit(e);
  };*/

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };
    return (
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}  >
              Generar Factura/Recibo
     </Typography> 
            <Grid container>
            <Grid item xs={12}>
              <Box m={0} p={2} boxShadow={1} >
              <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      size="small"
        rows={dataPacientes ? dataPacientes : []}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(evt)=>{
          //console.log(evt)
          //evt = []
          //console.log(evt)
          setSelectionModel(evt);
          setImporte(evt.reduce((sum, value) => (sum + dataPacientes[value].importe_total),0));
          setDataForm({
            ...dataForm,
            monto: parseFloat(evt.reduce((sum, value) => (sum + dataPacientes[value].importe_total),0)),
          });
        console.log(dataForm);
        console.log("Model: ",selectionModel)
        }}
        selectionModel={selectionModel}
      />
    </div><br></br>
    <form autoComplete="off" id="fr1" onSubmit={handleSubmit}>
    <Typography variant="h6" className={classes.title}  >
             Concepto factura/recibo
     </Typography> 
     <div>
    <TextField className={classes.field} variant="outlined" label="Concepto de pago" value={dataForm.concepto} type="text" name="concepto" onChange={handleInput} required />
      </div>
    <Button variant="contained" className={classes.btn} color="primary" onClick={handleOpen}>Generar</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <Grid container>
              <Grid  item xs={11} style={{margin:'auto'}}>
          <div className={classes.paper}>
            
              <Typography variant="h6">
            Emisión de RHE - Información Preliminar
            </Typography>
             
            <Box m={0} p={2} boxShadow={0} border={1} borderColor={'#0033A0'}>
            <Grid container>
              <Grid  item md={8} xs={12}>
                
                <Typography variant="h6">
                {/*`${nm.ap_pat} ${nm.ap_mat} ${nm.nombres}`.toUpperCase()*/}
                {nm.APELLIDOS_NOMBRES}
                </Typography>
                <Typography variant="h7">
            {nm.DIRECCION.toUpperCase()}
            <br/><strong>Teléfono: </strong>{nm.TELEFONO}
            </Typography><br/><br/>
                </Grid>
                <Grid  item md={4} xs={12}>
                <Box m={0} p={1} boxShadow={0} border={1} textAlign={'center'} borderColor={'#0033A0'}>
                <Typography align="center" variant="h7">
                  R.U.C. {nm.RUC}<br/>
                  RECIBO POR HONORARIOS ELECTRONICO
                </Typography>
                </Box><br></br>
                </Grid>
                </Grid>
            
            <Typography variant="h7">
            
              <strong>Recibí de: </strong>CLINICA INTERNACIONAL S A<br/>
              <strong>Identificado con </strong>RUC número 20100054184<br/>
              <strong>Domiciliado en </strong>JR. WASHINGTON NRO. 1471 LIMA LIMA LIMA<br/>
              <strong>Tipo de Transacción: </strong>-<br/>
              <strong>La suma de </strong>{dataForm.monto} Y 00/100 SOLES<br/>
              <strong>Por concepto </strong>{dataForm.concepto.toUpperCase()}<br/>
              <strong>Observación </strong>-<br/>
              <strong>Inciso </strong>"A" DEL ARTÍCULO 33 DE LA LEY DEL IMPUESTO A LA RENTA<br/>
              <strong>Fecha de Emisión </strong>{(new Date()).getDate()} <strong>de</strong> {["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][(new Date()).getMonth()]} <strong>de</strong> {(new Date()).getFullYear()}<br/>
              <Grid container>
              <Grid  item md={8} xs={12}><br/><br/>
                </Grid>
                <Grid  item md={4} xs={12}>
                <strong>Total por Honorarios: {parseFloat(importe).toFixed(2)}</strong><br/>
                <strong>Retención (8%) IR: 0.00</strong><br/>
                <strong>Total Neto Recibido: {parseFloat(importe).toFixed(2)} SOLES</strong><br/>
                
                </Grid>
                </Grid>
              
              
             {/*<h4>RUC: {nm.ruc}</h4>
              <h4>Concepto de pago: </h4>
            Descuentos: 0.00<br></br>
            Bonificaciones: 0.00<br></br>
            Atenciones: {dataPacientes ? importe = dataPacientes.reduce((sum, value) => (sum + value.monto ), 0): 0}<br></br>
            Importe bruto: {importe}<br></br>
            Impuesto: {importe*0.18}<br></br>
            Subtotal: {subtotal = importe*0.82}<br></br>
            Detracción: 0.00<br></br>
            Total: {subtotal}<br></br>*/}
            </Typography>
            <Grid container>
              <Grid  item md={6} xs={12} style={{margin:'auto', textAlign:'center'}}>
                <Typography variant="h7">
                  <br/>
                  <strong>ESTO ES UN BORRADOR, NO TIENE NINGUNA VALIDEZ LEGAL</strong><br/>
                  <strong>No incluye posibles retenciones que SUNAT pueda realizar</strong><br/>
                  ¿Está seguro que desea emitir este RHE?<br></br>
                </Typography>
                <Button variant="contained" style={{margin:'1em'}} color="primary" type="submit" form="fr1" >Emitir recibo</Button> 
                <Button variant="contained" style={{margin:'1em'}} onClick={handleClose} color="secondary" >Volver</Button> 
            
              </Grid>
              </Grid>
              </Box>
            
            
          </div>
          </Grid>
            </Grid>
        </Fade>
      </Modal>
    </form>
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
          Factura/recibo generado
        </Alert>
      </Snackbar>
                </Box>
                </Grid>
              
              {/*<Grid item md={12} xs={12}>
              <Box m={0} p={3} boxShadow={1}>
                  <h3>Pagos pendientes</h3>
                  <hr></hr>
                  <TableContainer >
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Médico</TableCell>
            {/*<TableCell align="right">Cliente</TableCell>*/}
           {/*} <TableCell align="right">Fecha atención</TableCell>
            <TableCell align="right">Paciente</TableCell>
          <TableCell align="right">Concepto</TableCell>*/}
            {/*<TableCell align="right">Tipo procedimiento</TableCell>*/}
            {/*<TableCell align="right">Tipo paciente</TableCell>*/}
            {/*<TableCell align="right">Sede</TableCell>*/}
            {/*<TableCell align="right">Proveedor</TableCell>*/}
           {/*} <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>*/}
        
          {/*
          dataPacientes?
        dataPacientes.map((row,index) => (
          <>
           <TableRow key={index}>
            <TableCell component="th" scope="row">
            {/*{nm.nombres} {nm.ap_pat} {nm.ap_mat}*/}
            {/*{nm.APELLIDOS_NOMBRES}
            </TableCell>*/}
            {/*<TableCell align="right">{row.tipo_paciente == 'seguro' ? "RIMAC S.A.": ""}</TableCell>*/}
            {/*<TableCell align="right">{row.fecha_atencion}</TableCell>
            <TableCell align="right">{row.paciente}</TableCell>
            <TableCell align="right">{row.tipo_atencion == 'cita' ? "CONSULTA AMBULATORIA": row.tipo_atencion == 'procedimiento' ? "CIRUGIA": ""}</TableCell>
            {/*<TableCell align="right">{row.tipo_atencion}</TableCell>*/}
            {/*<TableCell align="right">{row.tipo_paciente}</TableCell>*/}
            {/*<TableCell align="right">Medicentro</TableCell>*/}
            {/*<TableCell align="right">San Borja</TableCell>*/}
            {/*<TableCell align="right">{row.estado}</TableCell>
            <TableCell align="right">{row.monto}</TableCell>
          </TableRow>
          </>
        )): "Cargando..."
          */}
          {/*}
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
    </Grid>*/} 
            {/*
            <Grid item xs={12}>
              <Box m={0} p={2} boxShadow={1} >
                
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
                        <Button variant="contained" className={classes.btn} onClick={handleSubmit}>Generar factura</Button>
                    </form> 
              </Box>
              </Grid>
            */}
              <Grid item md={12} xs={12}>
        
        {/*
        <Box m={0} p={3} boxShadow={1}>
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
                 <Button className={classes.btn} variant="contained">Enviar</Button>
      
                  </Box>*/}
        <Box m={0} p={3} boxShadow={1}>
                  <h3>Facturas anteriores</h3>
                  <hr></hr>
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={dataFacturas ? dataFacturas : []}
                      columns={columnsList}
                      pageSize={5}
                      disableSelectionOnClick
                    />
                  </div>
                  {/*
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
                  <TableBody>*/}
                        {/*
                        dataFacturas?
                        dataFacturas.map((row,index) => (
                        <>
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                            {row.ruc}
                            </TableCell>
                            <TableCell>{nm.APELLIDOS_NOMBRES}</TableCell>
                            <TableCell>{nm.DIRECCION}</TableCell>
                            <TableCell>{row.concepto}</TableCell>
                            <TableCell>{row.fec_emision}</TableCell>
                            <TableCell>{row.monto}</TableCell>
                        </TableRow>
                        </>
                        )): "Cargando..."
                    }       
                        </TableBody>
                    </Table>
                  </TableContainer>*/}
                </Box>
                </Grid>

            </Grid>
        </div>
            
    )
}

export default Form
