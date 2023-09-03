import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "../../../../css/application/BaseDatos.module.css"
import commonStyles from "../../../../css/application/AppChat.module.css"
import Buscador from "../Buscador"
import { DocumentData, collection, getDocs } from "firebase/firestore"
import { db } from "../../../../js/firebaseApp"
import ListaRegistros from "./ListaRegistros"
import NuevoRegistro from "./NuevoRegistro"

interface Tabla {
    displayName: string,
    valores: DocumentData
    uid: string
}

function setPaginaBd(pagina: number, setPagina: Dispatch<SetStateAction<number>>, tabla: Tabla) {
    switch (pagina) {
        case 1:
            return <ListaRegistros tabla={tabla} pagina={pagina} setPagina={setPagina} />
        case 2:
            return <NuevoRegistro tabla={tabla} pagina={pagina} setPagina={setPagina} />
        default:
            break;
    }
}

function BaseDatos() {
    const [tabla, setTabla] = useState("")
    const [pagina, setPagina] = useState(1)
    const [listaTabla, setListaTabla] = useState<Tabla[]>([])

    useEffect(() => {
        let dbRef = collection(db, "baseDatos")
        const getBaseDatos = async() => {
            await getDocs(dbRef).then(async(res) => {
                let listaTabla : Tabla[] = []
                res.docs.forEach(element => {
                    listaTabla.push({displayName: element.id, valores: element.data(), uid: "baseDatos-"+element.id})
                });

                dbRef = collection(db, "usuarios")
                await getDocs(dbRef).then((res) => {
                    listaTabla.push({displayName: "usuarios", valores: res.docs, uid: "usuarios"})
                    setListaTabla(listaTabla)
                })
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
                    <>
                    {setPaginaBd(pagina, setPagina, listaTabla.find((tablaLista) => {return tablaLista.displayName === tabla})!)}
                    </>                
                    :
                    <></>
                }
                
            </div>
        </div>
    )
}

export default BaseDatos