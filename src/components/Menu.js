import React, { Fragment } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Drawer, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UpdateIcon from '@material-ui/icons/Update';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

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
        color:'#0B132B'
    },
    toolbar: theme.mixins.toolbar
    //<div className={classes.toolbar}></div>
}));
const Menu = (props) => {
  const classes = useStyles();
    return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        variant={props.variant}
        open={props.open}
        onClose={props.onClose ? props.onClose : null}
      >
          <div className={classes.toolbar}></div>
            <div className={classes.root}>

            <List component="nav">
            
            <ListItem button>
            <ListItemIcon>
            <SearchIcon />
            </ListItemIcon>
            <Link className={classes.label} to="/home">
            <ListItemText primary="Búsqueda de Atenciones" />
            </Link>
            </ListItem>
           
            <Divider />
            <ListItem button>
            <ListItemIcon>

            <AssignmentIndIcon />
            </ListItemIcon>
            
            <Link className={classes.label} to="/cita">
            <ListItemText  primary="Citas Atendidas" />
            </Link>
            </ListItem>
            <Divider />
            <ListItem button>
            <ListItemIcon>
            <AssignmentIcon  />
            </ListItemIcon>
            <Link className={classes.label} to="/procedimiento">
            <ListItemText className={classes.label} primary="Procedimientos" />
            </Link>
            </ListItem>
            <Divider />
            <ListItem button>
            <ListItemIcon>
            <AssignmentTurnedInIcon />
            </ListItemIcon>
            <Link className={classes.label} to="/bono">
            <ListItemText className={classes.label} primary="Bonos de Cumplimiento" />
            </Link>
            </ListItem>
            
            <Divider />
            <ListItem button>
            <ListItemIcon>
            <InsertDriveFileIcon />
            </ListItemIcon>
            <Link className={classes.label} to="/form">
            <ListItemText className={classes.label} primary="Generar Factura/Recibo" />
            </Link>
            </ListItem>
            <Divider />
            <ListItem button>
            <ListItemIcon>
            <UpdateIcon />
            </ListItemIcon>
            <Link className={classes.label} to="/actualizar">
            <ListItemText className={classes.label} primary="Actualizar Datos" />
            </Link>
            
            </ListItem>
            <Divider />
            <ListItem button>
            <ListItemIcon>
            <ExitToAppIcon />
            </ListItemIcon>
            <Link className={classes.label} to="/logout">
            <ListItemText className={classes.label} primary="Cerrar Sesión" />
            </Link>
            
            </ListItem>
            <Divider />
            </List>  
                
                
            
            </div>

            </Drawer>
    )
}

export default Menu;
