import styles from "../../css/simulador.module.css"
import { Chart} from "react-chartjs-2" 

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { Dispatch, useEffect, useState } from "react";
import TextInputSim from "./TextInputSim";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Estado {
    estado: string,
    cb: Dispatch<React.SetStateAction<string>>
}

interface Estados {
    titular: Estado
    edad: Estado,
    ingresos: Estado,
    deudas: Estado,
    sabeCasa: Estado,
    precio: Estado,
    provincia: Estado,
    quiereCasa: Estado,
    uso: Estado,
    tipoVivienda: Estado,
    anyos: Estado,

    siguiente: {
        estado: number,
        cb: Dispatch<React.SetStateAction<number>>
    }
}

interface Datos {
    titular: string
    edad: string,
    ingresos: string,
    deudas: string,
    sabeCasa: string,
    precio: string,
    provincia: string,
    quiereCasa: string,
    uso: string,
    tipoVivienda: string,
    anyos: string
}

interface Props {
    capital: Estado,
    anyos: Estado,
    toggle: {
        estado: number,
        cb: Dispatch<React.SetStateAction<number>>
    },
    estados: Estados
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
    return [Math.round(cuotaMensual * 100) / 100, Math.round(interesesTotales * 100) /100]
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
    return Math.ceil(((capital-cuota)*(interes/100))/12 * 100) / 100
}

function calcularAmortizadoMensual(cuota: number, intereses: number) {
    return cuota - intereses
}

function Resumen({capital, anyos, toggle, estados}: Props) {

    const [capitalState, setCapital] = useState<number>(parseInt(capital.estado))
    const [interes, setInteres] = useState<number>(3)
    const [anyosState, setAnyos] = useState<number>(parseInt(anyos.estado))

    const [mensualidad, setMensualidad] = useState(0)
    const [data, setData] = useState({labels: ["Intereses totales", "Capital"], 
    datasets: [{
        data: [interes.toString(), capital.toString()],
        backgroundColor: ["#333", "#399C85"],
        borderColor: ["#333", "#399C85"],
        hoverOffset: 4
    }]})

    const [intereses, setIntereses] = useState(0)

    const [gastosNotariaMin, setGastosNotariaMin] = useState(0)
    const [gastosNotariaMax, setGastosNotariaMax] = useState(0)
    const [gastosRegistroMin, setGastosRegistroMin] = useState(0)
    const [transmisiones, setTransmisiones] = useState(0)

    const [datos, setDatos] = useState<Datos>()
    let navigate = useNavigate()

    useEffect(() => {
        const [cuota, intereses] = calcular(capitalState, interes, anyosState)
        setMensualidad(cuota)
        setIntereses(intereses)
        setGastosNotariaMin(0.3/100 * (capitalState+intereses))
        setGastosNotariaMax(0.5/100 * (capitalState+intereses))

        setGastosRegistroMin(0.1/100 * (capitalState+intereses))

        setTransmisiones(0.4/100 * (capitalState+intereses))

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
        setDatos({
            titular: estados.titular.estado,
            edad: estados.edad.estado,
            ingresos: estados.ingresos.estado,
            deudas: estados.deudas.estado,
            sabeCasa: estados.sabeCasa.estado,
            precio: estados.precio.estado,
            provincia: estados.provincia.estado,
            quiereCasa: estados.quiereCasa.estado,
            uso: estados.uso.estado,
            tipoVivienda: estados.tipoVivienda.estado,
            anyos: estados.anyos.estado
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
                            <p>Capital ({capitalState} €)</p>
                        </div>
                        <div className={styles.leyendaDiv}>
                            <div className={`${styles.leyendaRecuadro} ${styles.grisOscuro}`}></div>
                            <p>Intereses totales ({intereses} €)</p>
                        </div>
                    </div>
                </div>
                <div className="inputs">
                <TextInputSim titulo={"Capital inicial"} explicacion={""} tipo={"number"} placeholder={"Capital"} magnitud={"€"} valorDefault={capitalState} valorDefaultCb={setCapital} disabled={false}  />
                <TextInputSim titulo={"Intereses"} explicacion={"Fijo: 3%, Variable: 4%, Mixto: 5%"} tipo={"number"} placeholder={"Intereses"} magnitud={"%"} valorDefault={interes} valorDefaultCb={setInteres} disabled={false}  />
                <TextInputSim titulo={"Plazo de amortización"} explicacion={"Máximo fijo: 30 años\nMáximo variable: 40 años"} tipo={"number"} placeholder={"Años"} magnitud={"Años"} valorDefault={anyos.estado.toString()} valorDefaultCb={setAnyos} disabled={false}  />
            </div>

            <div className={styles.resultadoMensualidades}>
                <div className={styles.mensualidad}>
                    <h2>Mensualidad</h2>
                    <div>
                        <span className={styles.magnitud}>{mensualidad} €/mes</span>
                    </div>
                </div>
                <div className={`${styles.mensualidad} ${styles.gastosExtra}`}>
                    <h2>Gastos tasación</h2>
                    <div>
                        <span className={styles.magnitud}>{250} €</span>
                    </div>
                </div>
                <div className={`${styles.mensualidad} ${styles.gastosExtra}`}>
                    <h2>Gastos notaría</h2>
                    <div>
                        <span className={styles.magnitud}>{gastosNotariaMin.toFixed(2)} € - {gastosNotariaMax.toFixed(2)} €</span>
                    </div>
                </div>
                <div className={`${styles.mensualidad} ${styles.gastosExtra}`}>
                    <h2>Gastos gestoría</h2>
                    <div>
                        <span className={styles.magnitud}>{400} €</span>
                    </div>
                </div>
                <div className={`${styles.mensualidad} ${styles.gastosExtra}`}>
                    <h2>Gastos registro</h2>
                    <div>
                        <span className={styles.magnitud}>{gastosRegistroMin.toFixed(2)} € - {gastosNotariaMin.toFixed(2)} €</span>
                    </div>
                </div>

                <div className={`${styles.mensualidad} ${styles.gastosExtra}`}>
                    <h2>Impuestos</h2>
                    <div>
                        <span className={styles.magnitud}>{transmisiones.toFixed(2)} €</span>
                    </div>
                </div>
            </div>
            </div>
            <div className={styles.botones}>
                <button className={styles.botonSecundario} onClick={() => toggle.cb(1)}>Recalcular</button>
                <button className={styles.botonPrimario} onClick={() => navigate({pathname: "/estudio", search: createSearchParams({data: JSON.stringify(datos)}).toString()})}>SOLICITAR ESTUDIO</button>
            </div>
        </div>
    )
}

export default Resumen