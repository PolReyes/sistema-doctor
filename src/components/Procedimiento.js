import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import api from '../api';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#0061DF',
      color: theme.palette.common.white,
    },
    body:{
        fontSize:14
    },
    container: {
        display: "flex"
      }
  }))(TableCell);

  const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        textAlign: 'right',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    title: {
        margin:'0px',
        textAlign:'right',
        border: '5px solid',
      },
      container:{
          paddingTop:'100px',
          padding: '40px',
          width:'100%'
      }
  }))

const Procedimiento = () => {
    const classes = useStyles();
    const nm = JSON.parse(localStorage.getItem('user'));
    const [dataPagos, setDataPagos] = useState({});

    const getConsultas = async () => {
        const resp = await axios.get(`http://${api}/api/montos?doctor=${nm.id_doctor}`)
        setDataPagos(resp.data)
      }
      
      useEffect(() => {
        getConsultas();
      }, []);

    return (
        <div className={classes.container}>
            <Grid container>
              
              <Grid item md={12} xs={12}>
                <Box m={2} p={3} boxShadow={2}>
                    <Typography variant="h5" color="primary">
                    <strong>PROCEDIMIENTOS</strong>
                    <hr></hr>
                    </Typography>
                    <Typography variant="h6" >
                    Montos acumulados pendientes de pago
                    </Typography><br></br>
                    {dataPagos.hasOwnProperty('success') ?
      <>
      <TableContainer >
      <Table className={classes.table1}  aria-label="simple table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Tipo Paciente</StyledTableCell>
          <StyledTableCell>Tipo Procedimiento</StyledTableCell>
            <StyledTableCell>Cantidad</StyledTableCell>
            <StyledTableCell>Monto</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        <TableRow key="seguro">
              <TableCell>Seguro</TableCell>
              <TableCell>Cirugia</TableCell>
              <TableCell>{dataPagos.cantidades[2]}</TableCell>
              <TableCell >S/ {dataPagos.montos[2]}</TableCell>
            </TableRow>
            <TableRow key="particular">
              <TableCell>Particular</TableCell>
              <TableCell>Cirugia</TableCell>
              <TableCell>{dataPagos.cantidades[3]}</TableCell>
              <TableCell >S/ {dataPagos.montos[3]}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer> 
    <Alert severity="info">
    <AlertTitle>Info</AlertTitle>
    
    <h3> <strong>Monto Acumulado: S/ {dataPagos.totales[1]}</strong></h3>
    <h3>Estado: Pendiente</h3>
        
    </Alert>  
        
     
      </>
    : "Cargando..."
    }
    
      
                  </Box>
            </Grid>   
            </Grid>
        </div>
    )
}

export default Procedimiento
