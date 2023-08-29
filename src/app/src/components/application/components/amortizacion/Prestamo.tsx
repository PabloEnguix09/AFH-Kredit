import { Dispatch, SetStateAction, useEffect } from "react"
import styles from "../../../../css/application/Amortizacion.module.css"
import Mensualidad from "./Mensualidad"
import utils from "../../../../js/utils"

interface IMensualidad {

    mes: number,
    cuota: number,
    intereses: number,
    principal: number,
    restante: number,
    pagado: boolean
}

interface IPrestamo {
    nombre: string,
    mensualidades: IMensualidad[]
}

interface Props {
    setPagina: Dispatch<SetStateAction<number>>,
    prestamos:  IPrestamo
}

function checkIfPrestamoScrollable() {
    
    if (document.querySelector(`.${styles.mensualidades}`)?.classList.contains("listaScrollable")) {
        document.getElementsByClassName(styles.titulos)[0]?.classList.add(styles.titulosScrollable)
    }
}

function renderMensualidades(prestamo: IPrestamo) {
    return prestamo.mensualidades.map((mensualidad) => {
        return <Mensualidad key={mensualidad.mes} mes={mensualidad.mes} intereses={mensualidad.intereses} principal={mensualidad.principal} restante={mensualidad.restante} cuota={mensualidad.cuota} />
    })
}

function Prestamo(props: Props) {

    useEffect(() => {
        utils.checkIfScrollable(styles.mensualidades)
        checkIfPrestamoScrollable()
    }, [])

    return(
        <div className={styles.listaMensualidades}>
            <div className={styles.titulos}>
                <p>Mes</p>
                <p>Intereses</p>
                <p>Principal</p>
                <p>Restante</p>
                <p>Cuota</p>
            </div>
            <div className={styles.mensualidades}>
                {renderMensualidades(props.prestamos)}
            </div>
        </div>
    )
}

export default Prestamo