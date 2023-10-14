import styles from "../../../../css/application/Documentos.module.css"
import nuevo from "../../../../img/icono_mas.svg"
import noticia from "../../../../img/application/blog.svg"
import eliminar from "../../../../img/application/eliminar.svg"
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../../js/firebaseApp"
import { Dispatch, SetStateAction, useState } from "react"

interface Props {
    nuevo: boolean,
    titular: string
}

async function borrarNoticia(nombre: string, setIsBorrado: Dispatch<SetStateAction<boolean>>) {
    const blogRef = collection(db, "blog")

    await getDocs(query(blogRef,where("titular", "==", nombre))).then(async(docs) => {
        let noticia = docs.docs[0]
        await deleteDoc(doc(db, "blog", docs.docs[0].id)).then(() => {
            setIsBorrado(true)
        })
        
    })

    
}

function Noticia(props: Props) {    
    const [isBorrado, setIsBorrado] = useState(false)

    return(
        <>
        {isBorrado 
            ? 
                <></> 
            : 
            <div className={styles.doc}>
                <div>
                    {props.nuevo 
                    ?
                        <>
                        <img className={`${styles.nuevo} ${styles.iconoDoc}`} src={nuevo} alt="Nueva noticia" />
                        <p>Nueva noticia</p>
                        </>
                    : 
                        <>
                            <img src={eliminar} alt="Eliminar noticia" className={styles.eliminarDoc} onClick={async() => borrarNoticia(props.titular, setIsBorrado)}/>
                            <img src={noticia} className={styles.iconoDoc} alt="Icono noticia" />
                        </>
                    }
                </div>
                <p className="nombreNoticia">{props.nuevo ? "" : props.titular}</p>
            </div>
        }
        </>
    )
}

export default Noticia