import React from 'react'
import {AppBar, Toolbar, makeStyles } from '@material-ui/core';
import logo from '../RpaLatam.png'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme=>({
    offset: theme.mixins.toolbar,
    logo: {
        margin:'auto'},
    bgColor: {
        backgroundColor:'#fff'
    }
}))

const NavBar = () => {
    const classes = useStyles()
    return (
        <AppBar position="fixed" className={classes.bgColor}> 
        
        <Toolbar>
        <Link to="/" className={classes.logo}>
                   <img  className={classes.logo} src={logo} alt="LOGO"/>
        </Link>
        </Toolbar>
        </AppBar>
    )
}

export default NavBar