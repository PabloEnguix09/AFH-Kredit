import styles from "../../css/simulador.module.css"
import { Chart} from "react-chartjs-2" 

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { createSearchParams, useNavigate } from "react-router-dom";
import { Dispatch, useEffect, useState } from "react";
import TextInputSim from "./TextInputSim";
import { calcularTotalHipoteca } from "../../js/simulador";
import { ISimuladorEstado, ISimuladorEstados, ISimuladorValores } from "../../types/simulador.types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    capital: ISimuladorEstado,
    anyos: ISimuladorEstado,
    interesInicial: number
    toggle: {
        estado: number,
        cb: Dispatch<React.SetStateAction<number>>
    },
    estados: ISimuladorEstados
}

function Resumen({capital, anyos, interesInicial, toggle, estados}: Props) {

    const [capitalState, setCapital] = useState<number>(parseInt(capital.estado))
    const [interes, setInteres] = useState<number>(interesInicial)
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
    const [transmisionesMin, setTransmisionesMin] = useState(0)
    const [transmisionesMax, setTransmisionesMax] = useState(0)

    const [datos, setDatos] = useState<ISimuladorValores>()
    let navigate = useNavigate()

    useEffect(() => {
        const [cuota, intereses] = calcularTotalHipoteca(capitalState, interes, anyosState)
        setMensualidad(cuota)
        setIntereses(intereses)
        setGastosNotariaMin(0.3/100 * (capitalState+intereses))
        setGastosNotariaMax(0.5/100 * (capitalState+intereses))

        setGastosRegistroMin(0.1/100 * (capitalState+intereses))

        setTransmisionesMin(4/100 * (capitalState))
        setTransmisionesMax(11/100 * (capitalState))

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
            necesitas: estados.necesitas.estado,
            provincia: estados.provincia.estado,
            quiereCasa: estados.quiereCasa.estado,
            uso: estados.uso.estado,
            tipoVivienda: estados.tipoVivienda.estado,
            anyos: estados.anyos.estado,
            siguiente: estados.siguiente.estado
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <TextInputSim titulo={"Intereses"} explicacion={"Fijo: 4%, Variable: 5%, Mixto: 3%"} tipo={"number"} placeholder={"Intereses"} magnitud={"%"} valorDefault={interes} valorDefaultCb={setInteres} disabled={false}  />
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
                        <span className={styles.magnitud}>300 - 600 €</span>
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
                        <span className={styles.magnitud}>300 - 600 €</span>
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
                        <span className={styles.magnitud}>{transmisionesMin.toFixed(2)} € - {transmisionesMax.toFixed(2)} €</span>
                    </div>
                </div>
                *Gastos aproximados
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