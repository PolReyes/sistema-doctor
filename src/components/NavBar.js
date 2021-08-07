import React from 'react'
import {AppBar, Toolbar, makeStyles, IconButton } from '@material-ui/core';
import logo from '../RpaLatam.png'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme=>({
    //offset: theme.mixins.toolbar,
    logo: {
        margin:'auto'},
    appBar:{
        [theme.breakpoints.up('sm')]:{
            width: `calc(100% - ${280}px)`,
            marginLeft: 280,
        },
        
        backgroundColor:'#fff',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: "#999",
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}))


const NavBar = (props) => {
    const classes = useStyles()
    return (
        <AppBar position="fixed" className={classes.appBar}> 
        
        <Toolbar>
        <IconButton
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                    onClick={() => props.desplegar()}
                >
            <MenuIcon  fontSize="large"/>
        </IconButton>
                   <img  className={classes.logo} src={logo} alt="LOGO"/>
                
        </Toolbar>
        </AppBar>
    )
}

export default NavBar