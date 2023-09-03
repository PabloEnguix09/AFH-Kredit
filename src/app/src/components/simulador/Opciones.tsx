import { Dispatch } from "react";
import styles from "../../css/simulador.module.css"
import { Tooltip } from "react-tooltip"
import { calcularMensualidad, calcularTae, seleccionarOpcion } from "../../js/simulador";

interface Props {
    siguiente: number,
    cb: Dispatch<React.SetStateAction<number>>,
    capital: number,
    anyos: number
    
}

function Opciones(props:Props) {

    let tinAvg = 3.75
    let eurAct = 4.149
    return(
        <div className={styles.opcionesHipotecas}>
            <h1>Selecciona una opción</h1>
            <div>
                <div id="fija" className={styles.opcionHipoteca} onClick={e => seleccionarOpcion(e.currentTarget.id)} >
                    <Tooltip />
                    <h2>Hipoteca fija</h2>
                    <p>Pago: {calcularMensualidad(props.capital, calcularTae(tinAvg), props.anyos).toFixed(2)}€/mes</p>
                    <p>TIN medio: {tinAvg}%</p>
                    <p>TAE media: {calcularTae(tinAvg)}%</p>
                </div>
            <hr />
            <div id="variable" className={styles.opcionHipoteca} onClick={e => seleccionarOpcion(e.currentTarget.id)}>
                <h2>Hipoteca variable</h2>
                <p>Pago: {calcularMensualidad(props.capital, calcularTae(eurAct), props.anyos).toFixed(2)}€/mes</p>
                <p>EURIBOR: {eurAct}%</p>
                <p>TAE Variable media: {calcularTae(eurAct)}%</p>
            </div>
            <hr />
            <div id="mixta" className={styles.opcionHipoteca} onClick={e => seleccionarOpcion(e.currentTarget.id)}>
                <h2>Hipoteca mixta</h2>
                <p className={styles.parteMixta}>Parte fija ({"< 20"} años)</p>
                <p>Pago: {calcularMensualidad(props.capital, calcularTae(tinAvg), props.anyos).toFixed(2)}€/mes</p>
                <p>TIN medio: {tinAvg}%</p>
                <p>TAE media: {calcularTae(tinAvg)}%</p>
            </div>
            </div>
            <div className={styles.botones}>
                <button className={styles.botonSecundario} onClick={() => props.cb(1)}>Atrás</button>
                <button className={styles.botonPrimario} onClick={() => props.cb(3)}>Continuar</button>
            </div>
        </div>
    )
}

export default Opciones