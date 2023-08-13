import { Dispatch, SetStateAction, useState } from "react"
import TextInputSim from "../../../simulador/TextInputSim"
import styles from "../../../../css/application/Amortizacion.module.css"

interface Props {
    setPagina: Dispatch<SetStateAction<number>>
}

function NuevoPrestamo(props: Props) {
    const [nombre, setNombre] = useState<string>("")
    const [capital, setCapital] = useState<number>(0)
    const [interes, setInteres] = useState<number>(3)
    const [anyos, setAnyos] = useState<number>(0)
    
    return(
        <div className={styles.nuevoPrestamo}>
            <div className={styles.datosPrestamo}>
                <div>
                <TextInputSim titulo={"Nombre del préstamo"} explicacion={""} tipo={"text"} placeholder={"Casa"} magnitud={""} valorDefault={nombre} valorDefaultCb={setNombre} disabled={false} />
                <TextInputSim titulo={"Capital inicial"} explicacion={""} tipo={"number"} placeholder={"Capital"} magnitud={"€"} valorDefault={capital} valorDefaultCb={setCapital} disabled={false} />
                </div>

                <div>
                    <TextInputSim titulo={"Intereses"} explicacion={"Fijo: 3%, Variable: 4%, Mixto: 5%"} tipo={"number"} placeholder={"Intereses"} magnitud={"%"} valorDefault={interes} valorDefaultCb={setInteres} disabled={false} />
                    <TextInputSim titulo={"Plazo de amortización"} explicacion={"Máximo fijo: 30 años\nMáximo variable: 40 años"} tipo={"number"} placeholder={"Años"} magnitud={"Años"} valorDefault={anyos} valorDefaultCb={setAnyos} disabled={false} />
                </div>


            </div>

            <button className={styles.anyadirBtn}>Añadir préstamo</button>
            
        </div>
    )
}

export default NuevoPrestamo