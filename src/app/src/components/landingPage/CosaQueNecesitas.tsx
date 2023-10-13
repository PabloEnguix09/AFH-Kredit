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
            <div className={styles.cosaNecesaria}>
                <h2>{nombre}</h2>
                {img}
            </div>
            <span>{texto}</span>
        </div>
    )
}

export default Cosa