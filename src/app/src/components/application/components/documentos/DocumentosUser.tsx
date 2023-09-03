import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "../../../../css/application/Documentos.module.css"
import buscar from "../../../../img/application/buscar.svg"
import commonStyles from "../../../../css/application/App.module.css"
import Doc from "./Doc"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { User } from "firebase/auth"
import { storage } from "../../../../js/firebaseApp"

interface Props {
    datos: User
}

interface Documento {
    nombre:string,
    linkDescarga:string
}

function renderDocumentos(documentos: Documento[], emailUsuario: string) {
        return documentos.map((documento) => {        
            return <Doc nuevo={false} nombreDoc={documento.nombre} linkDoc={documento.linkDescarga} key={documento.nombre} isAdmin={false} emailUsuario={emailUsuario} />
        })
}

function DocumentosUser(props:Props) {

    const [documento, setDocumento] = useState("")
    const [documentos, setDocumentos] = useState<Documento[]>([])
    const [userEmail, setUserEmail] = useState("")

    const getAllFiles = async(email: string) => {
        setDocumentos([])
        let documentos : Documento[] = []
        
        await listAll(ref(storage, `/${email}/`)).then((res) => {
            res.items.forEach(async(item) => {
                documentos.push({nombre: item.name, linkDescarga: await getDownloadURL(item)})

                if (documentos.length === res.items.length) {
                    setDocumentos(documentos)
                }
            })
        })
    }

    useEffect(() => {
        if(props.datos.email!) {            
            setUserEmail(props.datos.email)
            getAllFiles(props.datos.email)
        }
    }, [])



    const handleBuscar = (docu: string) => {

        setDocumento(docu)
        
        let listaDocumentos = document.getElementsByClassName(styles.doc)
        
        if(docu !== "") {
            
            for (let i = 0; i < listaDocumentos.length; i++) {
                const documento = listaDocumentos[i];
                let nombre = documento.getElementsByClassName("nombreDoc")[0]
                
                if(!nombre.innerHTML.toLowerCase().includes(docu.toLowerCase())) {
                    console.log(documento);
                                        
                    documento.classList.add(commonStyles.oculto)
                }
                else if(documento.classList.contains(commonStyles.oculto)) {
                    documento.classList.remove(commonStyles.oculto)
                }
            }
        }
        if(docu === "") {            
            for (let i = 0; i < listaDocumentos.length; i++) {
                const documento = listaDocumentos[i];
                if(documento.classList.contains(commonStyles.oculto)) {
                    documento.classList.remove(commonStyles.oculto)
                }
            }
        }
    }

    return(
        <div className={styles.documentosUser}>
            <div className={`${commonStyles.buscadorInput} ${styles.buscadorDocumentos}`}>
                <input type="text" className={commonStyles.buscarInput} placeholder="Buscar..." onChange={e => {handleBuscar(e.target.value)}} value={documento}/>
                <img src={buscar} alt="Icono buscar" />
            </div>

            <div className={styles.listaDocumentos}>
                <Doc nuevo={true} nombreDoc={""} linkDoc={""} isAdmin={false} emailUsuario={userEmail} onUpdated={getAllFiles} />
                {renderDocumentos(documentos, userEmail)}
            </div>
        </div>
    )
}

export default DocumentosUser