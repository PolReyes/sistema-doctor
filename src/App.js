import './App.css';
import React from 'react'
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home  from './components/Home';
import Form  from './components/Form';
import Logout  from './components/Logout';
import Register from './components/Register'
import { BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Cita from './components/Cita';
import { makeStyles } from "@material-ui/core/styles";
import SideBar from './components/SideBar';
import Procedimiento from './components/Procedimiento';
import Bono from './components/Bono';
import Actualizar from './components/Actualizar'

const useStyles = makeStyles({
  container: {
    display: "flex"
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
        <Route path="/home">
        <SideBar />
        <Home/>
        </Route>
        <Route path="/cita">
        <SideBar />
        <Cita/>
        </Route>
        <Route path="/procedimiento">
        <SideBar />
        <Procedimiento/>
        </Route>
        <Route path="/bono">
          <SideBar />
        <Bono/>
        </Route>
        <Route path="/form">
        <SideBar />
        <Form/>
        </Route>
        <Route path="/actualizar">
        <SideBar />
        <Actualizar/>
        </Route>
        <Route path="/register">
        <NavBar/>
        <Register/>
        </Route>
        <Route path="/logout">
        <Logout/>
        </Route>
        </Switch>
      </Router>
      
    </div>
    
    
        
     
    
  );
}

export default App;
