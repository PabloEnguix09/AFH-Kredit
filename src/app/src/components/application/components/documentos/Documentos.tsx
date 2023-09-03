import styles from "../../../../css/application/Documentos.module.css"
import commonStyles from "../../../../css/application/AppChat.module.css"
import Buscador from "../Buscador"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import InfoContacto from "../chat/InfoContacto"
import Doc from "./Doc"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../../../../js/firebaseApp"
import { User } from "firebase/auth"

interface Props {
    contactos: ContactoDatos[]
    contactoSelected: string,
    setContactoSelected: Dispatch<SetStateAction<string>>,
}
interface ContactoDatos {
    displayName : string,
    uid: string,
    key: string,
    conversacionUID: string
}

interface Documento {
    nombre:string,
    linkDescarga:string
}

function renderDocumentos(documentos: Documento[], emailUsuario: string, getAllFiles: (email: string) =>Promise<void>) {
        return documentos.map((documento) => {        
            return <Doc nuevo={false} nombreDoc={documento.nombre} linkDoc={documento.linkDescarga} key={documento.nombre} isAdmin={true} emailUsuario={emailUsuario} onUpdated={getAllFiles} />
        })
}

function Documentos(props:Props) {

    const [documentos, setDocumentos] = useState<Documento[]>([])
    const [userEmail, setUserEmail] = useState("")
    const getAllFiles = async(email: string) => {
        setDocumentos([])
        let documentos : Documento[] = []
        await listAll(ref(storage, email)).then((res) => {
            res.items.forEach(async(item) => {
                documentos.push({nombre: item.name, linkDescarga: await getDownloadURL(item)})

                if (documentos.length === res.items.length) {
                    setDocumentos(documentos)
                }
            })
        })
    }

    useEffect(() => {
      
        if(props.contactoSelected !== "") {
            let datosContacto = props.contactos.find((contacto) => {
                return contacto.displayName === props.contactoSelected
            })

            if(datosContacto !== undefined) {
                setUserEmail(datosContacto.uid)
                getAllFiles(userEmail)
            }  
        }
    }, [props.contactoSelected, props.contactos])
    

    return(
        <div className={styles.documentos}>
            <Buscador contactoSelected={props.contactoSelected} setContactoSelected={props.setContactoSelected} imgContactos={""} contactos={props.contactos}/>

            <div className={commonStyles.ventanaChat}>
            {props.contactoSelected !== ""
                ?
                    <>
                        <InfoContacto imagenContacto={""} nombre={props.contactoSelected} telf={"+34 XXX XX XX XX"} />
                        <div className={styles.listaDocumentos}>
                            <Doc nuevo={true} nombreDoc={""} linkDoc={""} isAdmin={true} emailUsuario={userEmail} onUpdated={getAllFiles} />
                            {renderDocumentos(documentos, userEmail, getAllFiles)}
                        </div>
                    </>
                :
                    <></>
                }
            </div>
        </div>
    )
}

export default Documentos