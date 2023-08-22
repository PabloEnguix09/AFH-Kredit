import { useEffect, useState } from "react"
import styles from "../../../../css/application/Blog.module.css"
import buscar from "../../../../img/application/buscar.svg"
import Noticia from "./Noticia"
import { DocumentData, collection, getDocs } from "firebase/firestore"
import { db } from "../../../../js/firebaseApp"

function setNoticias(listaNoticias:DocumentData[]) {
    return listaNoticias.map((noticia) => {
        return <Noticia nuevo={false} titular={noticia.titular} key={noticia.titular+"-"+noticia.timestamp.seconds}/>
    })
}

function Blog() {

    const [listaNoticias, setListaNoticias] = useState<DocumentData[]>([])

    useEffect(() => {
        const blogRef = collection(db, "blog")
        const getNoticias = async() => {
            await getDocs(blogRef).then((res) => {
                let lista : DocumentData[] = []
                res.docs.forEach((noticia) => {
                    lista.push(noticia.data())
                })
                setListaNoticias(lista)
                
            })
        }
        getNoticias()
    }, [])

    return(
        <div className={styles.ventanaBlog}>
            <div className={`buscadorInput ${styles.buscadorNoticia}`}>
                <input type="text" className={`buscarInput ${styles.buscarNoticia}`} placeholder="Buscar..."/>
                <img src={buscar} alt="Icono buscar" />
            </div>

            <div className={styles.listaNoticias}>
                <Noticia nuevo={true} titular={""} />
                {setNoticias(listaNoticias)}
            </div>
        </div>
    )
}

export default Blog