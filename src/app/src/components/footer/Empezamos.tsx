import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css"


function Empezamos() {
    return(
        <div className={styles.empezamos}>
            <h1>¿Empezamos?</h1>
            <p>Rellena el siguiente formulario y te contactaremos para empezar todo el proceso</p>
            <Link to={"/contacto"}>
                <button>Contacta con nosotros</button>
            </Link>
        </div>
    )
}

export default Empezamos