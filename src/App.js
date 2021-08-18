import './App.css';
import React from 'react';
import { useState } from "react";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home  from './components/Home';
import Form  from './components/Form';
import Logout  from './components/Logout';
import Update from './components/Update'
import { BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Cita from './components/Cita';
import { makeStyles } from "@material-ui/core/styles";
import SideBar from './components/SideBar';
import Procedimiento from './components/Procedimiento';
import Bono from './components/Bono';
import Actualizar from './components/Actualizar'
import Register from './components/Register';

const useStyles = makeStyles({
  container: {
    display: "flex"
  },
  bgColor:{
    backgroundColor:'#000'
  }
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <NavBar/>
            <Login/>
          </Route>
          <Route path="/register" exact>
            <NavBar/>
            <Register />
          </Route>
          <Route path="/home" exact>
            <SideBar />
            <Home/>
          </Route>
          <Route path="/cita" exact>
            <SideBar />
            <Cita/>
          </Route>
          <Route path="/procedimiento" exact>
            <SideBar />
            <Procedimiento/>
          </Route>
          <Route path="/bono" exact>
            <SideBar />
            <Bono/>
          </Route>
          <Route path="/form" exact>
            <SideBar />
            <Form/>
          </Route>
          <Route path="/actualizar" exact>
            <SideBar />
            <Actualizar/>
          </Route>
          <Route path="/update" exact>
            <NavBar/>
            <Update/>
          </Route>
          <Route path="/logout" exact>
            <Logout/>
          </Route>
        </Switch>
      </Router>
      
    </div>
    
    
        
     
    
  );
}

export default App;
