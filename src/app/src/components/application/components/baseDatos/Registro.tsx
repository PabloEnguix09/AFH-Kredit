import { useState } from "react"
import styles from "../../../../css/application/BaseDatos.module.css"
import eliminar from "../../../../img/application/eliminar.svg"
import tick from "../../../../img/application/tick.svg"

interface Props {
    nombre: string,
    valor: number | string,
    magnitud: string
}
function Registro(props:Props) {

    const [isValueChanged, setIsValueChanged] = useState(false)
    const [valor, setValor] = useState(props.valor)
    return(
        <div className={styles.registro}>
            <p>{props.nombre}:</p>
            <div>
                {typeof(props.valor) === "number" 
                ? 
                <input type="number" value={valor} onChange={(e) => {
                    setIsValueChanged(true) 
                    setValor(e.currentTarget.value)
                }}/>
                :
                <input type="text" value={valor} onChange={(e) => {
                    setIsValueChanged(true) 
                    setValor(e.currentTarget.value)
                }}/>
                }
                <span>{props.magnitud}</span>
            </div>

            {isValueChanged 
            ? 
            <img src={tick} alt="Confirmar cambios" className={styles.tick} onClick={() => setIsValueChanged(false)} />
            : 
            <></>
            }

            <img src={eliminar} alt="Eliminar registro" className={styles.eliminar}/>
        </div>
    )
}

export default Registro