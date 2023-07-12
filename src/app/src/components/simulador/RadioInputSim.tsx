import { useState } from "react"
import styles from "../../css/simulador.module.css"

interface Props {
    titulo: string,
    opcion1: string,
    opcion2: string
} 

function RadioInputSim({titulo, opcion1, opcion2}: Props) {

    const [estado, changeEstado] = useState(opcion1)

    return(
        <div className={styles.radioInput}>
            <p className={styles.titulo}>{titulo}</p>
            <div className={styles.opciones}>
                <div className={styles.opcion}>
                    <input type="radio" name={opcion1} value={opcion1} onChange={() => changeEstado(opcion1)} checked={estado === opcion1}/>
                    <label htmlFor={opcion1}>{opcion1}</label>
                </div>
                <div className={styles.opcion}>
                    <input type="radio" name={opcion2} value={opcion2} checked={estado === opcion2} onChange={() => changeEstado(opcion2)}/>
                    <label htmlFor={opcion2}>{opcion2}</label>
                </div>
            </div>
        </div>
    )
}

export default RadioInputSim