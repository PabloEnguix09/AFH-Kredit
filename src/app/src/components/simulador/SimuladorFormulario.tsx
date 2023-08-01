import { log } from "console";
import styles from "../../css/simulador.module.css"
import Formulario from "./Formulario";
import Resumen from "./Resumen"
import React, { Dispatch, useState } from "react"
import Opciones from "./Opciones";

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

function pasosSimulador(estados: Estados) {
    
    switch (estados.siguiente.estado) {
        case 1:
            return <Formulario titular={estados.titular} edad={estados.edad} ingresos={estados.ingresos} deudas={estados.deudas} sabeCasa={estados.sabeCasa} precio={estados.precio} provincia={estados.provincia} quiereCasa={estados.quiereCasa} uso={estados.uso} tipoVivienda={estados.tipoVivienda} anyos={estados.anyos} siguiente={estados.siguiente} />
        case 2:
            return <Opciones siguiente={estados.siguiente.estado} cb={estados.siguiente.cb} />
        case 3:
            return <Resumen capital={parseInt(estados.precio.estado)} anyos={parseInt(estados.anyos.estado)} toggle={estados.siguiente.estado} setToggle={estados.siguiente.cb} />
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

    const [toggle, setToggle] = useState(false)
    const [paso, setPaso] = useState(1)
    
    let estados : Estados = {
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
            {pasosSimulador(estados)}
        </div>
    )
}

export default SimuladorFormulario