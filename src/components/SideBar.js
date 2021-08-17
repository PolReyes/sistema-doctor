import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid, Hidden, IconButton, Menu, Typography} from '@material-ui/core';
import MenuSideBar from './MenuSideBar';
import logo from '../RpaLatam.png'
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
    //zIndex: theme.zIndex.drawer + 1,
    //backgroundColor:'#fff',
    backgroundColor:'#0061DF',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
   
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        
    },
    logo: {
        margin:'auto'},  
    title: {
          flexGrow: 1,
          color:'#000'
    },
    
}));


  

const SideBar = () => {
  const nm = JSON.parse(localStorage.getItem('user'));
    const classes = useStyles();
    const [abrir, setAbrir] = React.useState(false);

    const desplegar = () => {
    setAbrir(!abrir);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const openProfile = Boolean(anchorEl);
    const handleMenuProfile = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleCloseProfile = () => {
    setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
      
      <AppBar elevation={1} className={classes.appBar}>
            <Toolbar>
            <Grid container style={{width:"100%",margin:"auto"}}>
            <Grid item xs={2}>
            <IconButton
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                    onClick={desplegar}
                    style={{color:'#fff'}}
                >
                <MenuIcon fontSize="large"/>
                </IconButton>
            </Grid>
            <Grid item  md={6} xs={4}>
              </Grid>    
                
                
                <Grid item  md={4} xs={6}>
            <div>
              
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuProfile}
                style={{color:'#fff',float:'right'}}
                
              >
                
                <PermIdentityOutlinedIcon fontSize="large" />
                <Typography variant="button" display="block">
              Mi cuenta
            </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openProfile}
                onClose={handleCloseProfile}
              >
                <MenuItem onClick={handleCloseProfile}>Perfil</MenuItem>
                <MenuItem onClick={handleCloseProfile}>Salir</MenuItem>
              </Menu>
            </div>
            </Grid>
            </Grid>
               {/*<img  className={classes.logo} src={logo} alt="LOGO"/>*/}
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
      <MenuSideBar variant="permanent" open={true} />
    </Hidden>
    <Hidden smUp>
      <MenuSideBar variant="temporary" open={abrir} onClose={desplegar} />
    </Hidden>
     
      
    <div className={classes.content}>
      <div className={classes.toolbar}></div>
    </div>
    
    </div>
       
    )
}

export default SideBar
