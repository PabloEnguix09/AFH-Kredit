import React from "react";
import styles from "./Landing.module.css";

interface Props {
    nombre: string, 
    img: JSX.Element, 
    texto:string
}
function Cosa({nombre, img, texto}:Props) {
    return (
        <div className={styles.cosaQueNecesitas}>
            <h3>{nombre}</h3>
            {img}
            <span>{texto}</span>
        </div>
    )
}

export default Cosa