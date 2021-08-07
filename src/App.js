import './App.css';
import React from 'react'
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home  from './components/Home';
import Form  from './components/Form';
import Logout  from './components/Logout';
import Register from './components/Register'
import { BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Main from './components/Main';


function App() {
  return (
    <div className="App">
       
      
      <Router>
      <div className="App">
      
        <Switch>
        <Route path="/" exact>
        <Login/>
        </Route>

          <Route path="/home">
          <Main />
          <Home/>
          </Route>

          <Route path="/form">
          <Main />
            <Form/>
          </Route>

          <Route path="/register">
            <Register/>
          </Route>

          <Route path="/Logout">
        <Logout/>
          </Route>
        </Switch>
        
        </div>
        </Router>
    </div>
    
    
        
     
    
  );
}

export default App;
