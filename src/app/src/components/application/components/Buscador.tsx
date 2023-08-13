import TarjetaContacto from "./chat/TarjetaContacto";
import buscar from "../../../img/application/buscar.svg"
import { Dispatch, SetStateAction, useEffect } from "react";

import styles from "../../../css/application/App.module.css"

interface Props {
    contactoSelected: string,
    setContactoSelected: Dispatch<SetStateAction<string>>,
    imgContactos: string
}

function checkIfScrollable() {
    let buscador = document.getElementsByClassName(styles.listaContactos)[0]
    let buscadorCss = window.getComputedStyle(document.getElementsByClassName(styles.listaContactos)[0], "")
    
    if(buscador.clientHeight > parseFloat(buscadorCss.maxHeight)) {

        buscador.classList.add(styles.listaScrollable)
    }
}

function Buscador({contactoSelected, setContactoSelected, imgContactos}: Props) {
    
    useEffect(() => {
        checkIfScrollable()
    }, [])

    return(
        <div className={styles.buscador}>
                <div className={styles.buscadorInput}>
                    <input type="text" className={styles.buscarInput} placeholder="Buscar..." />
                    <img src={buscar} alt="Icono buscar" />
                </div>

                <div className={styles.listaContactos}>
                    <TarjetaContacto imagenContacto={imgContactos} nombre={"Asesor AFH"} noLeidos={0} selected={contactoSelected} setSelected={setContactoSelected} />
                    <TarjetaContacto imagenContacto={imgContactos} nombre={"Asesor xddddddddddd"} noLeidos={2} selected={contactoSelected} setSelected={setContactoSelected} />

                </div>
            </div>
    )
}

export default Buscador