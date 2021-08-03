import './App.css';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home  from './components/Home';
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
        </Switch>
        </div>
      </Router>
        
        
    
  );
}

export default App;
