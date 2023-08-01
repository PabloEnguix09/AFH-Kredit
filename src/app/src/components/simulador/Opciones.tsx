import { Dispatch } from "react";
import styles from "../../css/simulador.module.css"
import { Tooltip } from "react-tooltip"
function seleccionarOpcion (id: string) {
    const opciones = document.getElementsByClassName(styles.opcionHipoteca)

    for (let i = 0; i < opciones.length; i++) {
        const opcion = opciones[i];
        
        if(opcion.classList.contains(styles.opcionSeleccionada) && opcion.id === id) {
            
            opcion.classList.remove(styles.opcionSeleccionada)
            return
        }
        else if (opcion.classList.contains(styles.opcionSeleccionada)) {
            opcion.classList.remove(styles.opcionSeleccionada)
        }
        
    }

    const opcion = document.getElementById(id)
    opcion?.classList.add(styles.opcionSeleccionada)
}

interface Props {
    siguiente: number,
    cb: Dispatch<React.SetStateAction<number>>
    
}

function Opciones(props:Props) {
    return(
        <div className={styles.opcionesHipotecas}>
            <h1>Tipos de hipotecas</h1>
            <div>
                <div id="fija" className={styles.opcionHipoteca} onClick={e => seleccionarOpcion(e.currentTarget.id)} >
                    <Tooltip />
                    <h2>Hipoteca fija</h2>
                    <p>Pago: {}€/mes</p>
                    <p>Desde TIN: {}%</p>
                    <p>TAE: {}%</p>
                </div>
            <hr />
            <div id="variable" className={styles.opcionHipoteca} onClick={e => seleccionarOpcion(e.currentTarget.id)}>
                <h2>Hipoteca variable</h2>
                <p>Pago: {}€/mes</p>
                <p>EURIBOR: +{}%</p>
                <p>TAE Variable: {}%</p>
            </div>
            <hr />
            <div id="mixta" className={styles.opcionHipoteca} onClick={e => seleccionarOpcion(e.currentTarget.id)}>
                <h2>Hipoteca mixta</h2>
                <p className={styles.parteMixta}>Parte fija ({"< 20"} años)</p>
                <p>Pago: {}€/mes</p>
                <p>Desde TIN: {}%</p>
                <p>TAE: {}%</p>
                <p className={styles.parteMixta}>Parte variable</p>
                <p>Pago: {}€/mes</p>
                <p>EURIBOR: +{}%</p>
                <p>TAE Variable: {}%</p>
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