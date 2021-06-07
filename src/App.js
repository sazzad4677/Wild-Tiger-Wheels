import './App.css';
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Blog from './components/Blog/Blog';
import NoMatch from './components/NoMatch/NoMatch';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const userContext = createContext();
function App() {
  const [loggedIn, setLoggedIn] = useState({});
  return (
    <userContext.Provider value = {[loggedIn, setLoggedIn]}>
    <Router>
      <Switch>
        <Route path="/home">
          <Home/>
        </Route>  
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute exact path="/destination">
          <Destination/>
        </PrivateRoute>
        <PrivateRoute path="/destination/:vehicle_type">
          <Destination/>
        </PrivateRoute>
        <Route path="/blog">
          <Blog></Blog>
        </Route>
        <Route path="/contact">
          <Contact></Contact>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
    </Router>
    </userContext.Provider>
  );
}

export default App;
