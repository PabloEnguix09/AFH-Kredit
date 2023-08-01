import React, { Dispatch } from "react"
import styles from "../../css/simulador.module.css"

interface Props {
    titulo: string,
    explicacion: string,
    tipo: string,
    placeholder: string,
    magnitud: string,
    valorDefault: string | number,
    valorDefaultCb: (valorDefault: any) => void
    disabled: boolean,
} 

function TextInputSim({titulo, explicacion, tipo, placeholder, magnitud, valorDefault, valorDefaultCb, disabled}: Props) {
    return(
        <div className={styles.textInput}>
            <p className={styles.titulo}>{titulo}</p>
            {
                explicacion !== "" 
                ?
                <span className={styles.explicacion}>{explicacion}</span>
                :
                <></>
            }
            <div>
                <input type={tipo} name={placeholder} placeholder={placeholder} defaultValue={valorDefault !== "" ? valorDefault : undefined} onChange={e => valorDefaultCb(e.currentTarget.value)} disabled={disabled}/>
                <span className={styles.magnitud}>{magnitud}</span>
            </div>
        </div>
    )
}

export default TextInputSim