import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Drawer, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const drawerWidth = 280;
const useStyles = makeStyles(theme=>({
    root: {
        width: '100%',
        minWidth: 280,
        //backgroundColor: theme.palette.background.paper,
    },
    drawer:{
        width:  drawerWidth,
        flexShrink: 0,
    },
    drawerPaper:{
        width:  drawerWidth,
    },
    toolbar: theme.mixins.toolbar
}));
const Menu = (props) => {
    const classes = useStyles()
    return (
        <div>
            <Drawer className={classes.drawer} 
            classes={{papper: classes.drawerPaper,}}
            anchor="left"
            variant={props.variant}
            open={props.open}
            onClose={props.onClose ? props.onClose : null}>
            <div className={classes.toolbar}></div>
            <Divider></Divider>
            <div className={classes.root}>
            <List component="nav">
            
            <ListItem button>
                <ListItemIcon>

                <InboxIcon />
                </ListItemIcon>
                
                <Link to="/form">
                <ListItemText primary="Citas Atendidas" />
                </Link>
                </ListItem>
                <ListItem button>
                <ListItemIcon>
                <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Procedimientos" />
                </ListItem>
                <ListItem button>
                <ListItemIcon>
                <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Bonos de cumplimiento" />
                </ListItem>
                </List>
                <Divider />
                <List component="nav">
                <ListItem button>
                <ListItemText primary="Trash" />
                </ListItem>

                </List>
            </div>

            </Drawer>
            
        </div>
    )
}

export default Menu
