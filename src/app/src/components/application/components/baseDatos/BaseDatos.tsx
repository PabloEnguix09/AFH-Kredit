import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "../../../../css/application/BaseDatos.module.css"
import commonStyles from "../../../../css/application/AppChat.module.css"
import appStyles from "../../../../css/application/App.module.css"
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

interface Props {
    setContactoSelected: Dispatch<SetStateAction<string>>
}

function setPaginaBd(pagina: number, setPagina: Dispatch<SetStateAction<number>>, tabla: Tabla, setContactoSelected: Dispatch<SetStateAction<string>>) {
    switch (pagina) {
        case 1:
            return <ListaRegistros tabla={tabla} pagina={pagina} setPagina={setPagina} setContactoSelected={setContactoSelected}/>
        case 2:
            return <NuevoRegistro tabla={tabla} pagina={pagina} setPagina={setPagina} setContactoSelected={setContactoSelected} />
        default:
            break;
    }
}

function BaseDatos(props: Props) {
    const [tabla, setTabla] = useState("")
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)
    const [pagina, setPagina] = useState(1)
    const [listaTabla, setListaTabla] = useState<Tabla[]>([])

    const cambiarPantallaMovil = async() => {
        document.getElementsByClassName(styles.baseDatosMovil)[0].getElementsByClassName(commonStyles.ventanaChat)[0].classList.remove(appStyles.oculto)
        console.log("docs mostrados");
    }

    const cambiarPantallaPc = async() => {
        document.getElementsByClassName(styles.baseDatosMovil)[0].getElementsByClassName(commonStyles.ventanaChat)[0].classList.add(appStyles.oculto)
        console.log("docs mostrados");
    }

    useEffect(() => {
        window.addEventListener("resize", () => setDeviceWidth(window.innerWidth))
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

        if(deviceWidth <= 768) {
            cambiarPantallaMovil()
        }
        else {
            cambiarPantallaPc()
        }
        

        getBaseDatos()
    }, [deviceWidth, tabla])

    return(
        <div>
             <div className={styles.baseDatos}>
                <Buscador contactoSelected={tabla} setContactoSelected={setTabla} imgContactos={"none"} contactos={listaTabla} />

                <div className={commonStyles.ventanaChat}>
                {
                        tabla !== ""
                        ?
                        <>
                        {setPaginaBd(pagina, setPagina, listaTabla.find((tablaLista) => {return tablaLista.displayName === tabla})!, setTabla)}
                        </>                
                        :
                        <></>
                    }

                </div>
            </div>

            <div className={styles.baseDatosMovil}>

                <div className={`${commonStyles.ventanaChat} ${appStyles.oculto}`}>
                {
                        tabla !== ""
                        ?
                        <>
                        {setPaginaBd(pagina, setPagina, listaTabla.find((tablaLista) => {return tablaLista.displayName === tabla})!, setTabla)}
                        </>                
                        :
                        <Buscador contactoSelected={tabla} setContactoSelected={setTabla} imgContactos={"none"} contactos={listaTabla} />
                    }

                </div>
            </div>
        </div>
    )
}

export default BaseDatos