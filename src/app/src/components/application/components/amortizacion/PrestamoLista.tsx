import { Dispatch, SetStateAction } from "react"
import styles from "../../../../css/application/Amortizacion.module.css"
import iconoMas from "../../../../img/icono_mas.svg"

interface Mensualidad {

    mes: number,
    cuota: number,
    intereses: number,
    principal: number,
    restante: number,
    pagado: boolean
}

interface Props {
    nuevo: boolean,
    nombrePrestamo: string,
    prestamoDatos: Mensualidad[],
    setPagina: Dispatch<SetStateAction<number>>,
    setNombrePrestamo: Dispatch<SetStateAction<string>>
}

function PrestamoLista(props: Props) {
    return(
        <div className={styles.prestamoLista} onClick={props.nuevo 
            ? () => props.setPagina(1) 
            : () => {
                props.setNombrePrestamo(props.nombrePrestamo)
                props.setPagina(2)}
            }>
            {props.nuevo 
            ? 
            <>
                <img src={iconoMas} alt="Crear nuevo préstamo"/>
                <p>Nuevo préstamo</p>
            </>
            :
            <>
                <p>{props.nombrePrestamo}</p>
            </>
            }
        </div>
    )
}

export default PrestamoLista