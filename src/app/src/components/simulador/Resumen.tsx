import styles from "../../css/simulador.module.css"
import { Chart} from "react-chartjs-2" 

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { Link } from "react-router-dom";
import { Dispatch, useEffect, useState } from "react";
import Mensualidades from "./Mensualidades";
import TextInputSim from "./TextInputSim";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    capital: number,
    anyos: number,
    toggle: number,
    setToggle: Dispatch<React.SetStateAction<number>>
}

/**
 * 
 * TODO: Backend impuestos/comunidad, revisar Figma
 * 
 * 
 * 
*/

function calcular(capital: number, interes: number, anyos: number) {
    let interesesTotales = 0
    let totalAmortizado = 0

    let cuotaMensual = calcularMensualidad(capital, interes, anyos)
    let interesMensual = []
    let amortizacionMensual = []

    interesMensual.push(0)
    amortizacionMensual.push(0)

    for (let i = 1; i < anyos*12; i++) {        
            interesMensual.push(calcularInteresMensual(capital, totalAmortizado, interes))
            amortizacionMensual.push(calcularAmortizadoMensual(cuotaMensual, interesMensual[i]))

            interesesTotales += interesMensual[i]
            totalAmortizado += amortizacionMensual[i]
    }
    return [Math.ceil(cuotaMensual * 100) / 100, Math.ceil(interesesTotales * 100) /100]
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

function Resumen({capital, anyos, toggle, setToggle}: Props) {

    const [capitalState, setCapital] = useState<number>(capital)
    const [interes, setInteres] = useState<number>(3)
    const [anyosState, setAnyos] = useState<number>(anyos)

    const [mensualidad, setMensualidad] = useState(0)
    const [data, setData] = useState({labels: ["Intereses totales", "Capital"], 
    datasets: [{
        data: [interes.toString(), capital.toString()],
        backgroundColor: ["#333", "#399C85"],
        borderColor: ["#333", "#399C85"],
        hoverOffset: 4
    }]})

    useEffect(() => {
        const [cuota, intereses] = calcular(capitalState, interes, anyosState)
        setMensualidad(cuota)

        // eslint-disable-next-line react-hooks/exhaustive-deps
        setData({
            labels: ["Intereses totales", "Capital"],
            datasets: [{
                data: [intereses.toString(), capitalState.toString()],
                backgroundColor: ["#333", "#399C85"],
                borderColor: ["#333", "#399C85"],
                hoverOffset: 4
            }]
        })
    }, [capitalState, interes, anyosState])

    

    return (
        <div id={styles.resultadoFormulario}>
            <div className={styles.resultado}>
                <div className={styles.resumenChart}>
                    <div className={styles.chartDiv}>
                        <Chart type={"doughnut"} data={data} options={{
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            responsive: true,
                            maintainAspectRatio: false
                        }} />
                    </div>
                    <div className={styles.leyendaContainer}>
                        <div className={styles.leyendaDiv}>
                            <div className={`${styles.leyendaRecuadro} ${styles.verde}`}></div>
                            <p>Capital</p>
                        </div>
                        <div className={styles.leyendaDiv}>
                            <div className={`${styles.leyendaRecuadro} ${styles.grisOscuro}`}></div>
                            <p>Intereses totales</p>
                        </div>
                    </div>
                </div>
                <div className="inputs">
                <TextInputSim titulo={"Capital inicial"} explicacion={""} tipo={"number"} placeholder={"Capital"} magnitud={"€"} valorDefault={capitalState} valorDefaultCb={setCapital} disabled={false}  />
                <TextInputSim titulo={"Intereses"} explicacion={"Fijo: 3%, Variable: 4%, Mixto: 5%"} tipo={"number"} placeholder={"Intereses"} magnitud={"%"} valorDefault={interes} valorDefaultCb={setInteres} disabled={false}  />
                <TextInputSim titulo={"Plazo de amortización"} explicacion={"Máximo fijo: 30 años\nMáximo variable: 40 años"} tipo={"number"} placeholder={"Años"} magnitud={"Años"} valorDefault={anyos.toString()} valorDefaultCb={setAnyos} disabled={false}  />
            </div>

            <div className={styles.resultadoMensualidades}>
                <div className={styles.mensualidad}>
                    <h2>Mensualidad</h2>
                    <div>
                        <span className={styles.magnitud}>{mensualidad} €/mes</span>
                    </div>
                </div>
            </div>
            </div>
            <div className={styles.botones}>
                <button className={styles.botonSecundario} onClick={() => setToggle(1)}>Recalcular</button>
                <Link to={"/contacto"}>
                    <button className={styles.botonPrimario}>SOLICITAR ESTUDIO</button>
                </Link>
            </div>
        </div>
    )
}

export default Resumen