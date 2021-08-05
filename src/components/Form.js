import { Grid, Box, TextField, Typography, Button, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
        width: '40%',
        margin:'10px'
    },
    btn:{
        backgroundColor:'#00E1CD',
        margin:'20px',
        color:'#fff'
    }
});

const Form = () => {

    const [dataFactura, setDataFactura] = useState({});

    const [dataFacturas, setDataFacturas] = useState([]);

    const classes = useStyles();
    const nm = JSON.parse(localStorage.getItem('user'));
    const [dataForm, setDataForm] = useState({
        ruc: `${nm.ruc}`,
        concepto: "",
        clavesol: "",
        pass: ""
    });

    const getConsultas = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/facturas?ruc=${nm.ruc}`)
        setDataFacturas(res.data)
        console.log(res)
      }
    
        useEffect(() => {
          getConsultas();
        }, [dataFacturas]);

    
    const handleInput = (event) => {
        const { value, name } = event.target;
        
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };
    
    const handleSubmit = () => {
        //const { userLogin, passLogin } = dataLogin;

        axios.post("http://127.0.0.1:8000/api/registrar",dataForm)
        .then(response => {
            console.log(response)
            setDataFactura(response.data)
        });
    };
    return (
        <div>
            <Grid container>
              <Grid item md={4} xs={12}>
              <Box m={2} p={2} boxShadow={3} >
              <Typography variant="h4" className={classes.title}  >
                        Generar Recibo/Factura
                </Typography>
                    <form noValidate autoComplete="off">
                        <div>
                        <TextField className={classes.field}  label="RUC"  type="text" name="ruc" value={nm.ruc} readonly onChange={handleInput} />
                        </div>
                        <div>
                        <TextField  className={classes.field}  type="text" name="concepto" required onChange={handleInput} />
                        </div>
                        <div>
                        <TextField  className={classes.field} label="Monto"  type="text" name="monto" required onChange={handleInput}/>
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
              <Grid item md={8} xs={12}>
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
