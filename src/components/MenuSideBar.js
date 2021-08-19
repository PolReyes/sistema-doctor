import React, { Fragment } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { Drawer, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UpdateIcon from '@material-ui/icons/Update';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import logo from '../RpaLatam.png'
const drawerWidth = 290;
const useStyles = makeStyles(theme=>({
    root: {
        width: '100%',
        minWidth: 290,
        //backgroundColor: theme.palette.background.paper,
        //backgroundColor:'#999'
        
    },
    drawer:{
        width:  drawerWidth,
        flexShrink: 0,
        
    },
    drawerPaper:{
        width:  drawerWidth,
        
    },
    label:{
        textDecoration: 'none',
        color:'#000',
        //marginLeft: '20px'
        
    },
    toolbar: theme.mixins.toolbar,
    logo:{
        margin:'42px',
    }
    //<div className={classes.toolbar}></div>
}));
const MenuSideBar = (props) => {
  const classes = useStyles();
    return (
        <Drawer
        PaperProps={{elevation:3}}
        className={classes.drawer}
        variant="permanent"
        variant={props.variant}
        open={props.open}
        onClose={props.onClose ? props.onClose : null}
      >
          <div className={classes.toolbar}>
          <Link to="/">
          <img  className={classes.logo} src={logo} alt="LOGO"/>
          </Link>
          </div>
            <div className={classes.root}>
          <Divider/>  
            <List component="nav" >
            <Link  to="/home" className={classes.label}>
            <ListItem  button>
                <ListItemIcon>

                <SearchIcon  style={{margin:'auto'}}/>
                </ListItemIcon>
                <ListItemText>
                    <strong>Búsqueda de Atenciones</strong>   
                </ListItemText>
            </ListItem>
            </Link>

            <Link  to="/cita" className={classes.label}>
            <ListItem  button>
                <ListItemIcon>

                <PeopleOutlineIcon style={{margin:'auto'}}/>
                </ListItemIcon>
                <ListItemText>
                    <strong>Citas Atendidas</strong>
                </ListItemText>
            </ListItem>
            </Link>

            <Link  to="/procedimiento" className={classes.label}>
            <ListItem button>
            <ListItemIcon>
            <ListAltOutlinedIcon  style={{margin:'auto'}}/>
            </ListItemIcon>
            <ListItemText>
                <strong>Procedimientos</strong>
            </ListItemText>
            </ListItem>
            </Link>

            <Link className={classes.label} to="/bono">
            <ListItem button>
            <ListItemIcon>
            <CheckBoxOutlinedIcon style={{margin:'auto'}}/>
            </ListItemIcon>
            <ListItemText>
                <strong>Bonos de Cumplimiento</strong>
            </ListItemText>
            </ListItem>
            </Link>

            <Link className={classes.label} to="/form">
            <ListItem button>
            <ListItemIcon>
            <DescriptionOutlinedIcon style={{margin:'auto'}} />
            </ListItemIcon>
            <ListItemText>
                <strong>Generar Factura/Recibo</strong>
            </ListItemText>
            </ListItem>
            </Link>

            <Link className={classes.label} to="/actualizar">
            <ListItem button>
            <ListItemIcon>
            <UpdateIcon style={{margin:'auto'}}/>
            </ListItemIcon>
            <ListItemText>
                <strong>Actualizar Datos SUNAT</strong>
            </ListItemText>
            </ListItem>
            </Link>

            <Link className={classes.label} to="/logout">
            <ListItem button>
            <ListItemIcon>
            <ExitToAppIcon style={{margin:'auto'}}/>
            </ListItemIcon>
            <ListItemText>
                <strong>Cerrar Sesión</strong>
            </ListItemText>
            </ListItem>
            </Link>
            </List>  
                
                
            
            </div>
            <Divider/>  
            </Drawer>
    )
}

export default MenuSideBar;
