import './App.css';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home  from './components/Home';
import Logout  from './components/Logout';
import { BrowserRouter as Router, Switch,Route,Link, NavLink} from "react-router-dom";
function App() {
  return (
    
      <Router>
        <div className="App">
      <NavBar/>
        <Switch>
        <Route path="/" exact>
        <Login/>
        </Route>
          <Route path="/home">
        <Home/>
          </Route>
          <Route path="/Logout">
        <Logout/>
          </Route>
        </Switch>
        </div>
      </Router>
        
        
    
  );
}

export default App;
