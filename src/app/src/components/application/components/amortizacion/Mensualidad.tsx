import { useState } from "react"
import styles from "../../../../css/application/Amortizacion.module.css"

interface Props {
    mes: number,
    intereses: number,
    principal: number,
    pagado: boolean,
}

function Mensualidad(props: Props) {
    const [pagado, setPagado] = useState(props.pagado)
    return(
        <div className={styles.mensualidad}>
            <p>{props.mes}</p>
            <p>{props.intereses} €</p>
            <p>{props.principal} €</p>
            <p>{props.intereses + props.principal} €</p>
            <input type="checkbox" name="checkbox" id="checkbox" checked={pagado} onClick={() => setPagado(!pagado)}/>
        </div>
    )
}

export default Mensualidad