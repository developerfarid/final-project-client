import React, { useEffect, useState } from 'react';
import Grid from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AllDataContext from './Context/AllDataContext';
import Admin from './Pages/Admin/Admin';
import Pay from './Pages/Admin/Pay';
import Footer from './Pages/Footer/Footer';
import Home from './Pages/HomePage/Home';
import Login from './Pages/Login/Login';
import PrivateRoute from './Pages/Login/PrivateRoute ';
import MoreProduct from './Pages/MoreProduct/MoreProduct';
import Register from './Pages/Register/Register';
import NotFound from "./Pages/WeOffer/NotFound";
import Headers from './Share/Header/Header';
import Order from './Share/Header/Order/Order';

const App = () => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
     setLoading(false) 
    }, 100)
  }, [])
  return (
  <>
    {loading ? (<div style={{width:"100%", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"#111"}}><Grid 
      heigth="100"
      width="100"
      color="grey"
        arialLabel="loading-indicator"
        
        /></div>): (
          <div>
          <AllDataContext>
            <Router>
              <Headers />
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='/home'>
                  <Home />
                </Route>
                <PrivateRoute path='/pay'>
                  <Pay />
                </PrivateRoute>
                <PrivateRoute path='/product/:id'>
                  <Order />
                </PrivateRoute>
    
                <PrivateRoute path='/admin'>
                  <Admin />
                </PrivateRoute>
                <Route path='/login'>
                  <Login />
                </Route>
                <Route path='/register'>
                  <Register />
                </Route>
                <Route path='/productAll'>
                  <MoreProduct />
                </Route>
                <Route path='*'>
                  <NotFound />
                </Route>
              </Switch>
              <Footer />
            </Router>
          </AllDataContext>
    
        </div>
    ) }</>
 
  );
};

export default App;
