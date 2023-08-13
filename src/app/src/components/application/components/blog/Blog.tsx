import styles from "../../../../css/application/Blog.module.css"
import buscar from "../../../../img/application/buscar.svg"
import Noticia from "./Noticia"
function Blog() {
    return(
        <div className={styles.ventanaBlog}>
            <div className={`buscadorInput ${styles.buscadorNoticia}`}>
                <input type="text" className={`buscarInput ${styles.buscarNoticia}`} placeholder="Buscar..."/>
                <img src={buscar} alt="Icono buscar" />
            </div>

            <div className={styles.listaNoticias}>
                <Noticia nuevo={true} titular={""} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
                <Noticia nuevo={false} titular={"Hipotecas altamente xd"} />
            </div>
        </div>
    )
}

export default Blog