import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Card, CardContent, Grid, TextField, Typography, Box } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';


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
    const classes = useStyles();
    const name = localStorage.getItem('user');
    
    const [tipoPaciente, setTipoPaciente] = React.useState('');
    const [tipoConsulta, settipoConsulta] = React.useState('');

  const handleChangePaciente = (event) => {
    setTipoPaciente(event.target.value);
  };
  const handleChangeConsulta = (event) => {
    settipoConsulta(event.target.value);
  };
    return (
        <>
        <Card className={classes.card} >
            <CardContent >
            <Typography variant="h6" className={classes.title}>
                Bienvenido Dr. {name}
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
                  id="tipo-pacinte"
                  value={tipoPaciente}
                  onChange={handleChangePaciente}
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
                  <MenuItem value={'Procedimiento'}>Cirujía/Otros</MenuItem>
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
    <div className={classes.root}>
                  <FormControl className={classes.formControl}>
                  <InputLabel id="label-tipo-consulta">Seleccionar Mes</InputLabel>
                  <Select
                  labelId="label-tipo-consulta"
                  id="tipo-consulta"
                  value={tipoConsulta}
                  onChange={handleChangeConsulta}
                  >
                  <MenuItem value={'Cita'}>Cita</MenuItem>
                  <MenuItem value={'Procedimiento'}>Cirujía/Otros</MenuItem>
                  <MenuItem value={'Bonos'}>Bonos</MenuItem>
                  </Select>
                  </FormControl>
              </div>
     <Button variant="contained" >Buscar</Button>
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
