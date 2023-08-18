import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import Contacto from "./pages/contacto";
import Nosotros from "./pages/nosotros";
import Login from "./pages/login";
import RecuperarPass from "./pages/recuperarPass";
import Simulador from "./pages/simulador";
import Blog from "./pages/blog";
import AdminApp from "./pages/appAdmin";
import UserApp from "./pages/appUser";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Router>
        <Routes>
            <Route path="/" Component={LandingPage} />
            <Route path="/contacto" Component={Contacto} />
            <Route path="/nosotros" Component={Nosotros} />
            <Route path="/login" Component={Login} />
            <Route path="/recuperarContraseña" Component={RecuperarPass} />
            <Route path="/simulador" Component={Simulador} />
            <Route path="/blog" Component={Blog} />
            
            <Route path="/app/admin" Component={AdminApp} />
            <Route path="/app/user" Component={UserApp} />
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()