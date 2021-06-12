import React, { createContext, useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Orders from "./components/Orders/Orders";
import Admin from "./components/Admin/Admin";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import CheckOut from "./components/CheckOut/CheckOut";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cart, setCart] = useState({});
  
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, cart, setCart }}>
      <Router>
          <Switch>
              <PrivateRoute  path="/admin">
                <Admin />
              </PrivateRoute>
              <PrivateRoute  path="/panel/:adminPanel">
                <Admin />
              </PrivateRoute>
              <Route path="/login">
                <Login/>
              </Route>
              <>
                <Header/>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <PrivateRoute path="/orders">
                    <Orders />
                  </PrivateRoute>
                  <PrivateRoute path="/checkout">
                    <CheckOut/>
                  </PrivateRoute>
              </>
          </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
