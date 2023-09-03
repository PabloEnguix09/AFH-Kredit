import styles from "../../../../css/application/Documentos.module.css"
import docs from "../../../../img/application/docs.svg"
import nuevo from "../../../../img/icono_mas.svg"

import eliminar from "../../../../img/application/eliminar.svg"
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react"
import { deleteObject, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../../../js/firebaseApp"
import { User } from "firebase/auth"

interface Props {
    nuevo: boolean,
    nombreDoc: string,
    linkDoc: string,
    isAdmin: boolean,
    emailUsuario: string,
    onUpdated?: (email: string) =>Promise<void>
}

async function borrarArchivo(linkDoc: string, setIsBorrado: Dispatch<SetStateAction<boolean>>) {

    await deleteObject(ref(storage, linkDoc)).then(() => {
        setIsBorrado(true)
    })
    
}

function Doc(props: Props) {

    let input = useRef<HTMLInputElement>(null)
    const [isBorrado, setIsBorrado] = useState(false)

    const clickDiv = () => {
        if(input.current !== null) {
            input.current.click()
        }
    }

    const subirArchivo = async(e: ChangeEvent<HTMLInputElement>, email: string) => {
        if(e.target.files !== null) {
            let archivo = e.target.files[0]
            const storageRef = ref(storage, `/${email}/${archivo.name}`)

            await uploadBytesResumable(storageRef, archivo).then(async(snapshot) => {
                if(props.onUpdated) {
                    props.onUpdated(email)                    
                }
            })

        }
    }

    return(
        <>
        {isBorrado 
            ?
                <></>
            : 
            <div className={styles.doc} onClick={() => {props.linkDoc !== "" ? window.open(props.linkDoc) : clickDiv()}}>
                <div>
                    {props.nuevo 
                    ?
                        <>
                        <img className={`${styles.nuevo} ${styles.iconoDoc}`} src={nuevo} alt="Nuevo documento" />
                        <p>Nuevo documento</p>
                        <input type="file" id="subirArchivo" style={{display: "none"}} ref={input} onChange={async(e) => await subirArchivo(e, props.emailUsuario)}/>
                    
                        </>
                    : 
                        <>
                            {props.isAdmin 
                            ? 
                                <img src={eliminar} alt="Eliminar documento" className={styles.eliminarDoc} onClick={async(e) =>{e.stopPropagation(); await borrarArchivo(props.linkDoc, setIsBorrado)} }/> 
                            : 
                                <></>
                            }
                            <img src={docs} className={styles.iconoDoc} alt="Icono documento" />
                        </>
                    }
                </div>
                <p className="nombreDoc">{props.nuevo ? "" : props.nombreDoc}</p>
            </div>
        }
        </>
    )
}

export default Doc