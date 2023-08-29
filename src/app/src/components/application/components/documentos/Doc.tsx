import styles from "../../../../css/application/Documentos.module.css"
import docs from "../../../../img/application/docs.svg"
import nuevo from "../../../../img/icono_mas.svg"

import eliminar from "../../../../img/application/eliminar.svg"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { deleteObject, ref } from "firebase/storage"
import { storage } from "../../../../js/firebaseApp"

interface Props {
    nuevo: boolean,
    nombreDoc: string,
    linkDoc: string
}

async function borrarArchivo(linkDoc: string, setIsBorrado: Dispatch<SetStateAction<boolean>>) {

    await deleteObject(ref(storage, linkDoc)).then(() => {
        setIsBorrado(true)
    })
    
}

function Doc(props: Props) {

    let input = useRef<HTMLInputElement>(null)
    const [isBorrado, setIsBorrado] = useState(false)

    let clickDiv = () => {
        if(input.current !== null) {
            input.current.click()
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
                        <input type="file" id="subirArchivo" style={{display: "none"}} ref={input}/>
                    
                        </>
                    : 
                        <>
                            <img src={eliminar} alt="Eliminar documento" className={styles.eliminarDoc} onClick={async(e) =>{e.stopPropagation(); await borrarArchivo(props.linkDoc, setIsBorrado)} }/>
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