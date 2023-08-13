import { Dispatch, SetStateAction, useEffect } from "react"
import styles from "../../../../css/application/Amortizacion.module.css"
import Mensualidad from "./Mensualidad"
import utils from "../../../../js/utils"

interface Props {
    setPagina: Dispatch<SetStateAction<number>>
}

function checkIfPrestamoScrollable() {
    
    if (document.querySelector(`.${styles.mensualidades}`)?.classList.contains("listaScrollable")) {
        document.getElementsByClassName(styles.titulos)[0]?.classList.add(styles.titulosScrollable)
    }
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
                <p>Pagado</p>
            </div>
            <div className={styles.mensualidades}>
                <Mensualidad mes={1} intereses={0} principal={0} pagado={true} />
                <Mensualidad mes={2} intereses={0} principal={0} pagado={false} />



            </div>
        </div>
    )
}

export default Prestamo