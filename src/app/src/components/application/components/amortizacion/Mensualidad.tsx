import { useState } from "react"
import styles from "../../../../css/application/Amortizacion.module.css"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../js/firebaseApp"

interface Props {
    mes: number,
    intereses: number,
    principal: number,
    restante: number,
    cuota: number
}

function Mensualidad(props: Props) {
    return(
        <div className={styles.mensualidad}>
            <p>{props.mes}</p>
            <p>{props.intereses.toLocaleString("es", {useGrouping: false, minimumFractionDigits: 2})} €</p>
            <p>{props.principal.toLocaleString("es", {useGrouping: false, minimumFractionDigits: 2})} €</p>
            <p>{props.restante.toLocaleString("es", {useGrouping: false, minimumFractionDigits: 2})} €</p>
            <p>{props.cuota.toLocaleString("es", {useGrouping: false, minimumFractionDigits: 2})} €</p>
        </div>
    )
}

export default Mensualidad