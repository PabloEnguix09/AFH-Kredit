import { SetStateAction, useEffect, useState } from "react"
import TextInputSim from "./TextInputSim"
import styles  from "../../css/simulador.module.css";

interface Detalle {
    capitalRestante: number,
    cuota: number,
    interes: number
}


function calcular(capital: number, interes: number, anyos: number, posterior: boolean, interesPost: number, cambioInteres: number) {
    let capitalRestante = capital
    let interesesTotales = 0
    let totalAmortizado = 0

    let cuotaMensual = []
    let interesMensual = []
    let amortizacionMensual = []
    
    let detalles : Detalle[] = []

    cuotaMensual.push(0)
    interesMensual.push(0)
    amortizacionMensual.push(0)

    for (let i = 1; i < anyos*12; i++) {        
            cuotaMensual.push(calcularMensualidad(capital, interes, anyos))
            interesMensual.push(calcularInteresMensual(capital, totalAmortizado, interes))
            amortizacionMensual.push(calcularAmortizadoMensual(cuotaMensual[i], interesMensual[i]))

            capitalRestante -= cuotaMensual[i]
            interesesTotales += interesMensual[i]
            totalAmortizado += amortizacionMensual[i]

            detalles.push({capitalRestante: capitalRestante, cuota: cuotaMensual[i], interes: interesMensual[i]}) 
    }
    
}

















function calcularMensualidad(capital: number, interes: number, anyos: number): number {
    let prestado = capital
    let interesMensual = interes/1200
    let plazo = anyos
    let denominador = 1-((1+interesMensual)**(-plazo*12))

    let mensualidad = prestado * interesMensual / denominador
    
    if(Number.isNaN(mensualidad) || mensualidad === Infinity) {
        mensualidad = 0
    }
    return mensualidad
}

function calcularInteresMensual(capital: number, cuota: number, interes: number): number {
    return ((capital-cuota)*(interes/100))/12
}

function calcularAmortizadoMensual(cuota: number, intereses: number) {
    return cuota - intereses
}

function Mensualidades() {

    const [capital, setCapital] = useState("0")
    const [interes, setInteres] = useState("0")
    const [anyos, setAnyos] = useState("0")

    const [mensualidad, setMensualidad] = useState("0")

    useEffect(() => {
        setMensualidad(calcularMensualidad(parseFloat(capital), parseFloat(interes), parseFloat(anyos)).toFixed(2))
    }, [capital, interes, anyos])

    return(
        <div id={styles.mensualidades}>
            <div className="inputs">
                <TextInputSim titulo={"Capital inicial"} explicacion={""} tipo={"number"} placeholder={"Capital"} magnitud={"€"} valorDefault={capital} valorDefaultCb={setCapital} disabled={false}  />
                <TextInputSim titulo={"Intereses"} explicacion={"Fijo: 3%, Variable: 4%, Mixto: 5%"} tipo={"number"} placeholder={"Intereses"} magnitud={"%"} valorDefault={interes} valorDefaultCb={setInteres} disabled={false}  />
                <TextInputSim titulo={"Plazo de amortización"} explicacion={"Máximo fijo: 30 años\nMáximo variable: 40 años"} tipo={"number"} placeholder={"Años"} magnitud={"Años"} valorDefault={anyos} valorDefaultCb={setAnyos} disabled={false}  />
            </div>

            <div className={styles.resultadoMensualidades}>
                <div className={styles.mensualidad}>
                    <h3>Mensualidad</h3>
                    <div>
                        <span className={styles.magnitud}>{mensualidad} €/mes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mensualidades