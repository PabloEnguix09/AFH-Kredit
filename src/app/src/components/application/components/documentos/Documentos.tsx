import styles from "../../../../css/application/Documentos.module.css"
import commonStyles from "../../../../css/application/AppChat.module.css"
import Buscador from "../Buscador"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import InfoContacto from "../chat/InfoContacto"
import Doc from "./Doc"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { storage } from "../../../../js/firebaseApp"

interface Props {
    contactos: ContactoDatos[]
    contactoSelected: string,
    setContactoSelected: Dispatch<SetStateAction<string>>
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

function renderDocumentos(documentos: Documento[]) {
        return documentos.map((documento) => {        
            return <Doc nuevo={false} nombreDoc={documento.nombre} linkDoc={documento.linkDescarga} key={documento.nombre} />
        })
}

function Documentos(props:Props) {

    const [documentos, setDocumentos] = useState<Documento[]>([])

    useEffect(() => {
      
        if(props.contactoSelected !== "") {
            let datosContacto = props.contactos.find((contacto) => {
                return contacto.displayName === props.contactoSelected
            })
            
            const getAllFiles =  async() => {
                setDocumentos([])
                let documentos : Documento[] = []
                await listAll(ref(storage, datosContacto?.uid)).then((res) => {
                    res.items.forEach(async(item) => {
                        documentos.push({nombre: item.name, linkDescarga: await getDownloadURL(item)})
    
                        if (documentos.length === res.items.length) {
                            setDocumentos(documentos)
                        }
                    })
                })
            }
            getAllFiles()
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
                            <Doc nuevo={true} nombreDoc={""} linkDoc={""} />
                            {renderDocumentos(documentos)}
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