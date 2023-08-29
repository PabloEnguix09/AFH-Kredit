import { useEffect, useState } from "react"
import styles from "../../../../css/application/Blog.module.css"
import docStyles from "../../../../css/application/Documentos.module.css"
import commonStyles from "../../../../css/application/App.module.css"
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
    const [noticia, setNoticia] = useState("")

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

    const handleBuscar = (noti: string) => {

        setNoticia(noti)
        
        let listaNoticias = document.getElementsByClassName(docStyles.doc)
        
        if(noti !== "") {
            
            for (let i = 0; i < listaNoticias.length; i++) {
                const noticia = listaNoticias[i];
                let nombre = noticia.getElementsByClassName("nombreNoticia")[0]
                
                if(!nombre.innerHTML.toLowerCase().includes(noti.toLowerCase())) {
                    console.log(noticia);
                                        
                    noticia.classList.add(commonStyles.oculto)
                }
                else if(noticia.classList.contains(commonStyles.oculto)) {
                    noticia.classList.remove(commonStyles.oculto)
                }
            }
        }
        if(noti === "") {            
            for (let i = 0; i < listaNoticias.length; i++) {
                const documento = listaNoticias[i];
                if(documento.classList.contains(commonStyles.oculto)) {
                    documento.classList.remove(commonStyles.oculto)
                }
            }
        }
    }

    return(
        <div className={styles.ventanaBlog}>
            <div className={`${commonStyles.buscadorInput} ${docStyles.buscadorDocumentos}`} style={{width: "95%"}}>
                <input type="text" className={commonStyles.buscarInput} placeholder="Buscar..." onChange={e => {handleBuscar(e.target.value)}} value={noticia}/>
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