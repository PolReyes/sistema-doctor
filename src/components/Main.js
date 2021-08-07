import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';
import Menu  from './Menu';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles(theme =>({
        root: {
            display:'flex'
        },
        toolbar:theme.mixins.toolbar,
        content:{
            flexGrow:1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        }
}));

const Main = () => {
    const classes=useStyles()
    const [abrir, setAbrir] = React.useState(false);

    const desplegar = () => {
        setAbrir(!abrir);
      };

    return (
        <div className={classes.root}>
            <NavBar desplegar={desplegar} />
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

export default Main
