import React from 'react'
import {AppBar, Toolbar, makeStyles, Grid, Box } from '@material-ui/core';
import logo from '../RpaLatam.png'
import logo1 from '../logo-clinica.png'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme=>({
    offset: theme.mixins.toolbar,
    logo: {
        margin:'auto',
   // padding:'auto'
//flexWrap:1
},
    bgColor: {
        backgroundColor:'#fff'
    }
}))

const NavBar = () => {
    const classes = useStyles()
    return (
        <>
        <AppBar position="fixed" className={classes.bgColor}> 
        
        <Toolbar>
        <Grid container style={{width:"100%",margin:"auto"}}>
                <Grid item md={2}>
                </Grid>
                <Grid item md={4} xs={12}>
                <img  className={classes.logo} src={logo} alt="LOGO-RPA"/> 
                </Grid>
        <Grid item md={4} xs={12} >
        <img  style={{float:"right",marginTop:"5px"}} className={classes.logo} src={logo1} alt="LOGO-CLINICA"/>
        
                </Grid>
                <Grid item md={2}>
                </Grid>
        
                
                
            </Grid>
        </Toolbar>
        
        </AppBar>
        <div className={classes.offset}></div>
   </>
   )
}

export default NavBar