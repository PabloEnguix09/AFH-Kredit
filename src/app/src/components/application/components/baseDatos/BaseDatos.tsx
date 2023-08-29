import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "../../../../css/application/BaseDatos.module.css"
import commonStyles from "../../../../css/application/AppChat.module.css"
import Buscador from "../Buscador"
import Registro from "./Registro"
import { DocumentData, collection, getDocs } from "firebase/firestore"
import { db } from "../../../../js/firebaseApp"

function checkIfScrollable() {
    let buscador = document.getElementsByClassName("listaTabla")[0]
    let buscadorCss = window.getComputedStyle(document.getElementsByClassName("listaTabla")[0], "")
    
    if(buscador.clientHeight > parseFloat(buscadorCss.maxHeight)) {

        buscador.classList.add("listaScrollable")
    }
}

interface Tabla {
    displayName: string,
    valores: DocumentData
    uid: string
}

function setRegistros(listaRegistros: Tabla) {
    
    let lista = Object.entries(listaRegistros.valores).map((registro) => {
        return <Registro nombre={registro[0]} valor={registro[1]} magnitud={"%"} key={registro[0]} nombreTabla={listaRegistros.displayName}/>
    })
    
    return lista
}

function BaseDatos() {
    const [tabla, setTabla] = useState("")
    const [listaTabla, setListaTabla] = useState<Tabla[]>([])

    useEffect(() => {
        const dbRef = collection(db, "baseDatos")
        const getBaseDatos = async() => {
            await getDocs(dbRef).then((res) => {
                let listaTabla : Tabla[] = []
                res.docs.forEach(element => {
                    listaTabla.push({displayName: element.id, valores: element.data(), uid: "baseDatos-"+element.id})
                });
                setListaTabla(listaTabla)
            })
        }

        getBaseDatos()
    }, [])

    return(
        <div className={styles.baseDatos}>
            <Buscador contactoSelected={tabla} setContactoSelected={setTabla} imgContactos={"none"} contactos={listaTabla} />

            <div className={commonStyles.ventanaChat}>
            {
                    tabla !== ""
                    ?
                    <div className={styles.listaTabla}>
                        <h2>{tabla}</h2>
                            <div>
                                {setRegistros(listaTabla.find((tablaLista) => {return tablaLista.displayName === tabla})!)}
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