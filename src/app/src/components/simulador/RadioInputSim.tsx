import { Dispatch } from "react"
import styles from "../../css/simulador.module.css"

interface Props {
    titulo: string,
    opcion1: string,
    opcion2: string,
    estado: string
    estadoCb: Dispatch<React.SetStateAction<string>>
}

function RadioInputSim({titulo, opcion1, opcion2, estado, estadoCb}: Props) {

    return(
        <div className={styles.radioInput}>
            <p className={styles.titulo}>{titulo}</p>
            <div className={styles.opciones}>
                <div className={styles.opcion}>
                    <input type="radio" name={opcion1} value={opcion1} onChange={e => estadoCb(e.currentTarget.value)} checked={estado === opcion1}/>
                    <label htmlFor={opcion1}>{opcion1}</label>
                </div>
                <div className={styles.opcion}>
                    <input type="radio" name={opcion2} value={opcion2} onChange={e => estadoCb(e.currentTarget.value)} checked={estado === opcion2}/>
                    <label htmlFor={opcion2}>{opcion2}</label>
                </div>
            </div>
        </div>
    )
}

export default RadioInputSim