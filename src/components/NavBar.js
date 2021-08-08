import React from 'react'
import {AppBar, Toolbar, makeStyles } from '@material-ui/core';
import logo from '../RpaLatam.png'

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
        
                   <img  className={classes.logo} src={logo} alt="LOGO"/>
                
        </Toolbar>
        </AppBar>
    )
}

export default NavBar