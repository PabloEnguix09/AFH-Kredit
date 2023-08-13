import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "../../../../css/application/BaseDatos.module.css"
import commonStyles from "../../../../css/application/AppChat.module.css"
import Buscador from "../Buscador"
import Registro from "./Registro"

function checkIfScrollable() {
    let buscador = document.getElementsByClassName("listaTabla")[0]
    let buscadorCss = window.getComputedStyle(document.getElementsByClassName("listaTabla")[0], "")
    
    if(buscador.clientHeight > parseFloat(buscadorCss.maxHeight)) {

        buscador.classList.add("listaScrollable")
    }
}

function BaseDatos() {
    const [tabla, setTabla] = useState("")

    useEffect(() => {
    }, [])

    return(
        <div className={styles.baseDatos}>
            <Buscador contactoSelected={tabla} setContactoSelected={setTabla} imgContactos={"none"} />

            <div className={commonStyles.ventanaChat}>
            {
                    tabla !== ""
                    ?
                    <div className={styles.listaTabla}>
                        <h2>{tabla}</h2>
                            <div>
                                <Registro nombre={"xd"} valor={"culo"} magnitud={"%"} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                                <Registro nombre={""} valor={""} magnitud={""} />
                            </div>
                    </div>                 
                    :
                    <></>
                }
                
            </div>
        </div>
    )
}

export default BaseDatos