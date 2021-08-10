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
    textAlign:'left',
    color:'#0033A0',
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
    paddingTop: '70px'
  }
}));

const Home = () => {
  const nm = JSON.parse(localStorage.getItem('user'));
  const [dataPacientes, setDataPacientes] = useState([]);
  const [dataPagos, setDataPagos] = useState({});

  const getConsultas = async () => {
    const res = await axios.get(`http://${api}/api/listar?doctor=${nm.id_doctor}`)
    setDataPacientes(res.data)
    console.log(res)
    const resp = await axios.get(`http://${api}/api/montos?doctor=${nm.id_doctor}`)
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

    
    axios.get(`http://${api}/api/filtros?doctor=${nm.id_doctor}&tipoPac=${dataFiltros.tipoPac ? dataFiltros.tipoPac : ''}&tipoCons=${dataFiltros.tipoCons? dataFiltros.tipoCons : ''}&tipoEst=${dataFiltros.tipoEst ? dataFiltros.tipoEst : ''}&finicio=${dataFiltros.finicio ? dataFiltros.finicio : ''}&ffin=${dataFiltros.ffin ? dataFiltros.ffin : ''}`)
    .then(response => {
      setDataPacientes(response.data)
      console.log(response.data)
    });
};

    return (
        <>
            
        
        <Grid container className={classes.container}>
        
        
              <Grid item xs={12}>
              <Box m={2} p={2} boxShadow={1} >
              <Typography variant="h6" className={classes.title2}>
              <strong>Reporte de servicios brindados</strong>
            </Typography>
            <form>
              <Grid container>
              <Grid item md={4} xs={12}>
                
                <FormControl className={classes.formControl}>
                    <InputLabel id="label-tipo-paciente">Tipo de paciente</InputLabel>
                    <Select
                    labelId="label-tipo-paciente"
                    id="tipo-paciente"
                    name="tipoPac"
                    value={tipoPaciente}
                    onChange={handleChangePaciente}
                    required
                    >
                    <MenuItem value={''}>Todos</MenuItem>
                    <MenuItem value={'seguro'}>Seguro</MenuItem>
                    <MenuItem value={'particular'}>Particular</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item md={4} xs={12}>
                
                <FormControl className={classes.formControl}>
                  <InputLabel id="label-tipo-consulta">Tipo de atención</InputLabel>
                  <Select
                  labelId="label-tipo-consulta"
                  id="tipo-consulta"
                  name="tipoCons"
                  value={tipoConsulta}
                  onChange={handleChangeConsulta}
                  >
                  <MenuItem value={''}>Todos</MenuItem>
                  <MenuItem value={'cita'}>Citas atendidas</MenuItem>
                  <MenuItem value={'procedimiento'}>Procedimientos</MenuItem>
                  <MenuItem value={'bono'}>Bonos de cumplimiento</MenuItem>
                  </Select>
                  </FormControl>
              </Grid>
              <Grid item md={4} xs={12}>
                
              <FormControl className={classes.formControl}>
                  <InputLabel id="label-tipo-estado">Estado</InputLabel>
                  <Select
                  labelId="label-tipo-estado"
                  id="tipo-estado"
                  name="tipoEst"
                  value={tipoEstado}
                  onChange={handleChangeEstado}
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
              <TextField inputProps={{min:"2021-07-01",max:"2021-08-09"}}  className={classes.formControl} type="date" name="finicio" value={finicio} onChange={handleChangeFinicio} />
                </Grid>
                <Grid item md={4} xs={12}>
                <TextField  inputProps={{max:"2021-08-09"}} className={classes.formControl} type="date" name="ffin" value={ffin} onChange={handleChangeFfin} />
               
                  
              </Grid>
              <Grid item md={4} xs={12}>
              <Button variant="contained"  onClick={handleSubmit}  className={classes.btn2}  endIcon={<SearchIcon />}>Buscar</Button>
              
              </Grid>
              </Grid>
                 
         
          
         
      
     
            </form>
              </Box>
              </Grid>
              <Grid item  xs={12}>
                <Box m={2} p={3} boxShadow={1}>
                  <TableContainer >
      <Table className={classes.table}  size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Médico</StyledTableCell>
            <StyledTableCell >Cliente</StyledTableCell>
            <StyledTableCell >Fecha atención</StyledTableCell>
            <StyledTableCell >Paciente</StyledTableCell>
            <StyledTableCell >Concepto</StyledTableCell>
            {/*<TableCell align="right">Tipo procedimiento</TableCell>*/}
            {/*<TableCell align="right">Tipo paciente</TableCell>*/}
            <StyledTableCell >Sede</StyledTableCell>
            <StyledTableCell >Proveedor</StyledTableCell>
            <StyledTableCell >Estado</StyledTableCell>
            <StyledTableCell >Monto</StyledTableCell>
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
            <TableCell >{row.tipo_paciente == 'seguro' ? "RIMAC S.A.": ""}</TableCell>
            <TableCell >{row.fecha_atencion}</TableCell>
            <TableCell >{row.paciente}</TableCell>
            <TableCell >{row.tipo_atencion == 'cita' ? "CONSULTA AMBULATORIA": row.tipo_atencion == 'procedimiento' ? "CIRUGIA": ""}</TableCell>
            {/*<TableCell align="right">{row.tipo_atencion}</TableCell>*/}
            {/*<TableCell align="right">{row.tipo_paciente}</TableCell>*/}
            <TableCell >Medicentro</TableCell>
            <TableCell >San Borja</TableCell>
            <TableCell >{row.estado}</TableCell>
            <TableCell >{row.monto}</TableCell>
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
    </TableContainer>
                </Box>
              </Grid>
              </Grid>
        
        
        
        </>
    )
}

export default Home