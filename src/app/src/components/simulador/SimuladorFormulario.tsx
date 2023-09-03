import styles from "../../css/simulador.module.css"
import Formulario from "./Formulario";
import Resumen from "./Resumen"
import { useState } from "react"
import Opciones from "./Opciones";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ISimuladorEstados } from "../../types/simulador.types";

function pasosSimulador(estados: ISimuladorEstados, navigate: NavigateFunction) {
    
    switch (estados.siguiente.estado) {
        case 1:
            return <Formulario titular={estados.titular} edad={estados.edad} ingresos={estados.ingresos} deudas={estados.deudas} sabeCasa={estados.sabeCasa} precio={estados.precio} provincia={estados.provincia} quiereCasa={estados.quiereCasa} uso={estados.uso} tipoVivienda={estados.tipoVivienda} anyos={estados.anyos} siguiente={estados.siguiente} />
        case 2:
            return <Opciones siguiente={estados.siguiente.estado} cb={estados.siguiente.cb} capital={parseInt(estados.precio.estado)} anyos={parseInt(estados.anyos.estado)} />
        case 3:
            return <Resumen capital={estados.precio} anyos={estados.anyos} toggle={estados.siguiente} estados={estados}/>
        default:
            break;
    }
}

function SimuladorFormulario() {

    const [titular, setTitular] = useState("Uno")
    const [edad, setEdad] = useState("")
    const [ingresos, setIngresos] = useState("")
    const [deudas, setDeudas] = useState("0")
    const [sabeCasa, setSabeCasa] = useState("Sí")
    const [precio, setPrecio] = useState("")
    const [provincia, setProvincia] = useState("")
    const [quiereCasa, setQuiereCasa] = useState("Sí")
    const [uso, setUso] = useState("Vivienda habitual")
    const [tipoVivienda, setTipoVivienda] = useState("Segunda mano")
    const [anyos, setAnyos] = useState("")

    const [paso, setPaso] = useState(1)
    let navigate = useNavigate()
    
    let estados : ISimuladorEstados = {
        titular: {estado: titular, cb: setTitular},
        edad: {estado: edad, cb: setEdad},
        ingresos: {estado: ingresos, cb: setIngresos},
        deudas: {estado: deudas, cb: setDeudas},
        sabeCasa: {estado: sabeCasa, cb: setSabeCasa},
        precio: {estado: precio, cb: setPrecio},
        provincia: {estado: provincia, cb: setProvincia},
        quiereCasa: {estado: quiereCasa, cb: setQuiereCasa},
        uso: {estado: uso, cb: setUso},
        tipoVivienda: {estado: tipoVivienda, cb: setTipoVivienda},
        anyos: {estado: anyos, cb: setAnyos},
        siguiente: {estado: paso, cb: setPaso}
    }

    return(
        <div id={styles.simulador}>
            {pasosSimulador(estados, navigate)}
        </div>
    )
}

export default SimuladorFormulario