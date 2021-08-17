import React, { useEffect, useState } from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Grid, TextField, Typography, Box } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import SearchIcon from '@material-ui/icons/Search';
import api from '../api';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#0061DF',
    color: theme.palette.common.white,
  },
  container: {
      display: "flex"
    }
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: '#000'
  },
  table: {
    minWidth: 360,
  },
  table1: {
    minWidth: 250,
  },
  card: {
    backgroundColor:'#0033A0',
    margin: '20px'
  },
  card2: {
    margin: '20px'
  },
  cardInfo: {
    backgroundColor:'#fff',
    margin: '20px'
  },
  title:{
    textAlign:'left',
    color:'#fff'
  },
  title1:{
    fontWeight:'bold',
    //textAlign:'left',
    color:'#fff'
  },
  title2:{
    //marginLeft:'20px',
    textAlign:'left',
    fontWeight:'bold'
    //color:'#0033A0',
  },
  btn:{
    backgroundColor:'#00E1CD',
    color:'#fff',
    float:'right',
    margin: '5px'
  },
  btn2:{
    backgroundColor:'#00E1CD',
    color:'#fff',
    width: '90%',
    margin: '10px',
  },
  formControl: {
    width: '90%',
    //minWidth: 320,
    margin: '10px',
    //flexGrow:1
  },
  label: {
    marginTop:'10px',
    marginLeft: '10px',
    color:'#0033A0',
    fontWeight:'bold'
  },
  textField: {
    width: '30%',
    //minWidth: 320,
    marginLeft: '10px',
    marginTop: '15px',
    marginBottom: '20px'
  },
  container:{
    paddingTop: '70px',
    
  }
}));

const Home = () => {
  const nm = JSON.parse(localStorage.getItem('user'));
  const [dataPacientes, setDataPacientes] = useState([]);
  const [dataPagos, setDataPagos] = useState({});

  const getConsultas = async () => {
    console.log(nm)
    const res = await axios.get(`http://${api}/api/listar?doctor=${nm.ID_DOCTOR}`)
    setDataPacientes(res.data)
    console.log(res)
    const resp = await axios.get(`http://${api}/api/montos?doctor=${nm.ID_DOCTOR}`)
    setDataPagos(resp.data)
  }

    useEffect(() => {
      getConsultas();
    }, []);

    const classes = useStyles();
    //let name = localStorage.getItem('user');
    //const nm = JSON.parse(localStorage.getItem('user'));
    //console.log(nm)
    //const name = props.usuario;
    //console.log(name.nombres);
    //console.log(typeof(nm))
    //console.log(usuario)
    
    const [tipoPaciente, setTipoPaciente] = React.useState('');
    const [tipoConsulta, settipoConsulta] = React.useState('');
    const [tipoEstado, settipoEstado] = React.useState('');
    const [finicio, setFinicio] = React.useState('');
    const [ffin, setFfin] = React.useState('');

    const [dataFiltros, setDataFiltros] = useState({
      tipoPac: "",
  });

  const columns = [
    { id: 'id_doctor', headerName: 'ID', width: 50 },
    { field: 'nombre_medico', headerName: 'Médico', width: 200 },
    {
      field: 'cliente',
      headerName: 'Cliente',
      width: 200,
      editable: false,
      sortable: false,
    },
    {
      field: 'fecha_atencion',
      headerName: 'Fecha atención',
      width: 150,
      editable: false,
    },
    {
      field: 'paciente',
      headerName: 'Paciente',
      width: 200,
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
      field: 'sede',
      headerName: 'Sede',
      width: 150,
      editable: false,
      sortable: false,
    },{
      field: 'proveedor',
      headerName: 'Proveedor',
      width: 120,
      editable: false,
      sortable: false,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 100,
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
  
  const handleChangePaciente = (event) => {
    setTipoPaciente(event.target.value);
    const { value, name } = event.target;
        
    setDataFiltros({
            ...dataFiltros,
            [name]: value,
        });
  };
  const handleChangeConsulta = (event) => {
    settipoConsulta(event.target.value);
    const { value, name } = event.target;
        
    setDataFiltros({
            ...dataFiltros,
            [name]: value,
        });
  };

  let a = 0;
  const handleChangeEstado = (event) => {
    settipoEstado(event.target.value);
    const { value, name } = event.target;
        
    setDataFiltros({
            ...dataFiltros,
            [name]: value,
        });
  };

  const handleChangeFinicio = (event) => {
    setFinicio(event.target.value);
    const { value, name } = event.target;
        
    setDataFiltros({
            ...dataFiltros,
            [name]: value,
        });
  };

  const handleChangeFfin = (event) => {
    setFfin(event.target.value);
    const { value, name } = event.target;
        
    setDataFiltros({
            ...dataFiltros,
            [name]: value,
        });
  };

  const handleSubmit = () => {
    //const { userLogin, passLogin } = dataLogin;

    
    axios.get(`http://${api}/api/filtros?doctor=${nm.ID_DOCTOR}&tipoPac=${dataFiltros.tipoPac ? dataFiltros.tipoPac : ''}&tipoCons=${dataFiltros.tipoCons? dataFiltros.tipoCons : ''}&tipoEst=${dataFiltros.tipoEst ? dataFiltros.tipoEst : ''}&finicio=${dataFiltros.finicio ? dataFiltros.finicio : ''}&ffin=${dataFiltros.ffin ? dataFiltros.ffin : ''}`)
    .then(response => {
      setDataPacientes(response.data)
      console.log(response.data)
    });
};

    return (
        <>
            
        
        <Grid container className={classes.container}>
        
        
              <Grid item xs={12}>
              
              <Box m={2} p={2} boxShadow={0} border={1} borderColor={'#0033A0'} >
              <Typography  className={classes.title2}>
              Reporte de servicios brindados
            </Typography>
            <form>
              <Grid container>
              <Grid item md={4} xs={12}>
                
                <FormControl variant="outlined" size="small" className={classes.formControl}>
                    <InputLabel id="label-tipo-paciente">Tipo de paciente</InputLabel>
                    <Select
                    labelId="label-tipo-paciente"
                    id="tipo-paciente"
                    name="tipoPac"
                    value={tipoPaciente}
                    onChange={handleChangePaciente}
                    label="Tipo de Paciente"
                    required
                    >
                    <MenuItem value={''}>Todos</MenuItem>
                    <MenuItem value={'seguro'}>Seguro</MenuItem>
                    <MenuItem value={'particular'}>Particular</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item md={4} xs={12}>
                
                <FormControl variant="outlined" size="small" className={classes.formControl}>
                  <InputLabel id="label-tipo-consulta">Tipo de atención</InputLabel>
                  <Select
                  labelId="label-tipo-consulta"
                  id="tipo-consulta"
                  name="tipoCons"
                  value={tipoConsulta}
                  onChange={handleChangeConsulta}
                  label="Tipo de Consulta"
                  >
                  <MenuItem value={''}>Todos</MenuItem>
                  <MenuItem value={'cita'}>Citas atendidas</MenuItem>
                  <MenuItem value={'procedimiento'}>Procedimientos</MenuItem>
                  <MenuItem value={'bono'}>Bonos de cumplimiento</MenuItem>
                  </Select>
                  </FormControl>
              </Grid>
              <Grid item md={4} xs={12}>
                
              <FormControl variant="outlined" size="small" className={classes.formControl}>
                  <InputLabel id="label-tipo-estado">Estado</InputLabel>
                  <Select
                  labelId="label-tipo-estado"
                  id="tipo-estado"
                  name="tipoEst"
                  value={tipoEstado}
                  onChange={handleChangeEstado}
                  label="Tipo de Estado"
                  >
                  <MenuItem value={''}>Todos</MenuItem>
                  <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
                  <MenuItem value={'Pagado'}>Pagado</MenuItem>
                  </Select>
                  </FormControl>
              </Grid>
              </Grid>
              
              <Grid container>
                <Grid item md={12} xs={12}>
                <InputLabel className={classes.label}>Rango de fechas:</InputLabel>
                </Grid>
              
              <Grid item md={4} xs={12}>
              <TextField inputProps={{min:"2021-07-01",max:"2021-08-09"}} variant="outlined" size="small" className={classes.formControl} type="date" name="finicio" value={finicio} onChange={handleChangeFinicio} />
                </Grid>
                <Grid item md={4} xs={12}>

                <TextField  inputProps={{min:"2021-07-01",max:"2021-08-16"}} className={classes.formControl} type="date" name="ffin" value={ffin} onChange={handleChangeFfin} />

               
                  
              </Grid>
              <Grid item md={4} xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit}  className={classes.btn2}  endIcon={<SearchIcon />}>Buscar</Button>
              
              </Grid>
              </Grid>
     
            </form>
              </Box>
              </Grid>
              <Grid item  xs={12}>

                <Box m={2} p={3} boxShadow={1}>

                <div style={{ height: 650, width: '100%' }}>
                    <DataGrid
                      
                      rows={dataPacientes ? dataPacientes : []}
                      columns={columns}
                      pageSize={10}
                      disableSelectionOnClick
                    />
                  </div>
                  {/*

                  <TableContainer >
      <Table className={classes.table}  size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Médico</StyledTableCell>
            <StyledTableCell >Cliente</StyledTableCell>
            <StyledTableCell >Fecha atención</StyledTableCell>
            <StyledTableCell >Paciente</StyledTableCell>
            <StyledTableCell >Concepto</StyledTableCell>
            <StyledTableCell >Sede</StyledTableCell>
            <StyledTableCell >Proveedor</StyledTableCell>
            <StyledTableCell >Estado</StyledTableCell>
            <StyledTableCell >Monto</StyledTableCell>
          </TableRow>
        </TableHead>
                  <TableBody>*/}
        
          {/*
          dataPacientes?
        dataPacientes.map((row,index) => (
          <>
           <TableRow key={index}>
            <TableCell component="th" scope="row">
            {nm.APELLIDOS_NOMBRES}
            </TableCell>
            <TableCell >{row.cliente}</TableCell>
            <TableCell >{row.fecha_atencion}</TableCell>
            <TableCell >{row.paciente}</TableCell>
            <TableCell >{row.concepto}</TableCell>
            <TableCell >{row.sede}</TableCell>
            <TableCell >{row.proveedor}</TableCell>
            <TableCell >{row.estado}</TableCell>
            <TableCell >{row.importe_total}</TableCell>
          </TableRow>
          </>
        )): "Cargando..."
      }
      <TableRow key="last">
            <TableCell colspan="8" component="th" scope="row">
              <b>Total</b>
            </TableCell>
            <TableCell ><b>{ dataPacientes?
        dataPacientes.reduce((sum, value) => (sum + value.monto ), 0)
        : "Cargando..."
      }</b></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>*/}
                </Box>
              </Grid>
              </Grid>
        
        
        
        </>
    )
}

export default Home