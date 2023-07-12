import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landing';
import Contacto from './contacto';
import Nosotros from './nosotros';
import Login from './login';
import RecuperarPass from './recuperarPass';
import Simulador from './simulador';
import Blog from './blog';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <Routes>
      <Route path='/' Component={LandingPage} />
      <Route path='/contacto' Component={Contacto} />
      <Route path='/nosotros' Component={Nosotros} />
      <Route path='/login' Component={Login} />
      <Route path='/recuperarContraseña' Component={RecuperarPass} />
      <Route path='/simulador' Component={Simulador} />
      <Route path='/blog' Component={Blog} />
    </Routes>

  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
