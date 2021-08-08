import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { Hidden, IconButton} from '@material-ui/core';
import Menu from './Menu';
import logo from '../RpaLatam.png'

const drawerWidth = 290;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'#fff'
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
    
}));


  

const SideBar = () => {
    const classes = useStyles();
    const [abrir, setAbrir] = React.useState(false);

    const desplegar = () => {
    setAbrir(!abrir);
    };
    return (
        <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                    onClick={desplegar}
                >
                <MenuIcon color="primary" fontSize="large"/>
                </IconButton>
                <img  className={classes.logo} src={logo} alt="LOGO"/>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
      <Menu variant="permanent" open={true} />
    </Hidden>
    <Hidden smUp>
      <Menu variant="temporary" open={abrir} onClose={desplegar} />
    </Hidden>
     
      
    <div className={classes.content}>
      <div className={classes.toolbar}></div>
    </div>
    
    </div>
       
    )
}

export default SideBar
