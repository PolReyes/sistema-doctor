import React from 'react'
import {AppBar, Toolbar, makeStyles } from '@material-ui/core';
import logo from '../logo-clinica.png'

const useStyles = makeStyles(theme=>({
    offset: theme.mixins.toolbar,
    logo: {
        margin:'auto'},
    bgcolor:{
        backgroundColor:'#fff',
    }
}))


const NavBar = () => {
    const classes = useStyles()
    return (
        <>
        <AppBar position="fixed" className={classes.bgcolor}> 
        <Toolbar>
                   <img  className={classes.logo} src={logo} alt="LOGO"/>
                
        </Toolbar>
        </AppBar>
        <div className={classes.offset}></div>
    </>
    )
}

export default NavBar