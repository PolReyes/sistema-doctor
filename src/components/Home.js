import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Card, CardContent, Grid, TextField, Typography, Box } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
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
  title2:{
    textAlign:'left',
    color:'#0033A0',
  },
  btn:{
    backgroundColor:'#00E1CD',
    color:'#fff',
    float:'right'
  },
  formControl: {
    float:'left',
    minWidth: 320,
    margin: '20px',
    //flexGrow:1
  },
  selectEmpty: {
  },
  label: {
    float:'left',
    marginLeft: '20px',
  },
  textField: {
    float:'left',
    minWidth: 320,
    marginLeft: '20px',
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const Home = () => {
  const nm = JSON.parse(localStorage.getItem('user'));
  const [dataPacientes, setDataPacientes] = useState([]);

    useEffect(() => {
      getConsultas()
    }, []);

    const getConsultas = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/listar?doctor=${nm.id_doctor}`)
      setDataPacientes(res.data)
      console.log(res)
    }



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
  };
  const handleSubmit = () => {
    //const { userLogin, passLogin } = dataLogin;

    axios.get(`http://127.0.0.1:8000/api/filtros?doctor=${nm.id_doctor}&&tipoPac=${dataFiltros.tipoPac}`)
    .then(response => {
      setDataPacientes(response.data)
      console.log(response.data)
    });
};
    return (
        <>
        <Card className={classes.card} >
            <CardContent >
            <Typography variant="h6" className={classes.title}>
                Bienvenido Dr. {nm.nombres} {nm.ap_pat}
                <Link to="/logout">
                <Button variant="contained" className={classes.btn}  endIcon={<ExitToAppIcon />}>Salir</Button>
                </Link>
            </Typography>
           
            </CardContent>
            <Card className={classes.cardInfo}>
            <CardContent >
            <Typography variant="h6">
                02 de Julio del 2021 Resumen del mes
            </Typography>
            <Typography variant="h6">
                total de pacientes: 50
            </Typography>
            {
          dataPacientes?
        dataPacientes.map((row) => (
          <>
          <h5 key={row.id_doctor}>{row.paciente} - {row.tipo_paciente} - {row.fecha_atencion} - {row.monto} - {row.estado}</h5>
          
           
              
            
          
          </>
        )): "Cargando..."
      }
            </CardContent>
            </Card>
            
        
        </Card>
        
        <Grid container>
              <Grid item md={4} xs={12}>
              <Box m={2} p={2} boxShadow={1} >
              <Typography variant="h6" className={classes.title2}>
              Buscar por filtros
            </Typography>
            <form>
            <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                  <MenuItem value={'Seguro'}>Seguro</MenuItem>
                  <MenuItem value={'Particular'}>Particular</MenuItem>
                  </Select>
                  </FormControl>
        </Grid>
      </Grid>
    </div>
    <div className={classes.root}>
                  <FormControl className={classes.formControl}>
                  <InputLabel id="label-tipo-consulta">Tipo de consulta</InputLabel>
                  <Select
                  labelId="label-tipo-consulta"
                  id="tipo-consulta"
                  value={tipoConsulta}
                  onChange={handleChangeConsulta}
                  >
                  <MenuItem value={'Cita'}>Cita</MenuItem>
                  <MenuItem value={'Procedimiento'}>Procedimiento</MenuItem>
                  <MenuItem value={'Bonos'}>Bonos</MenuItem>
                  </Select>
                  </FormControl>
              </div>
              <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <InputLabel className={classes.label}>Fecha</InputLabel>
        </Grid>
        <Grid item xs={12}>
        
          <TextField   className={classes.textField} type="date" name=""  />
        </Grid>
      </Grid>
    </div>
     <Button variant="contained"  onClick={handleSubmit}>Buscar</Button>
            </form>
              </Box>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box m={2} p={3} boxShadow={1}>
                  <h3>Vista general</h3>
                  <hr></hr>
                  <TableContainer >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre paciente</TableCell>
            <TableCell align="right">Tipo paciente</TableCell>
            <TableCell align="right">Fecha atención</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          dataPacientes?
        dataPacientes.map((row,index) => (
          <>
           <TableRow key={index}>
            <TableCell component="th" scope="row">
              {row.paciente}
            </TableCell>
            <TableCell align="right">{row.tipo_paciente}</TableCell>
            <TableCell align="right">{row.fecha_atencion}</TableCell>
            <TableCell align="right">{row.monto}</TableCell>
            <TableCell align="right">{row.estado}</TableCell>
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
        
            
            <Card className={classes.card2}>
            <CardContent >
           
           
            <TableContainer >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
           
            </CardContent>
            </Card>
        
        </>
    )
}

export default Home