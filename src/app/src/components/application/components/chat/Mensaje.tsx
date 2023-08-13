import { useState } from "react"
import styles from "../../../../css/application/AppChat.module.css"

interface Props {
    entrante: boolean,
    imagenContacto: string,
    contenido: string,
    hora: string
}
function Mensaje(props: Props) {

    return(
        <div className={styles.mensaje}>
            {props.entrante ? <img src={props.imagenContacto} alt="Imagen contacto" /> : <></>}
            <div className={props.entrante ? `${styles.contenidoMensaje} ${styles.entrante}` : `${styles.contenidoMensaje} ${styles.saliente}`}>
                <p>{props.contenido}</p>
                <span>{props.hora}</span>
            </div>
        </div>
    )
}

export default Mensaje