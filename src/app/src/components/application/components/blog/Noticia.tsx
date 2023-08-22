import styles from "../../../../css/application/Documentos.module.css"
import nuevo from "../../../../img/icono_mas.svg"
import noticia from "../../../../img/application/blog.svg"
import eliminar from "../../../../img/application/eliminar.svg"

interface Props {
    nuevo: boolean,
    titular: string
}

function Noticia(props: Props) {    

    return(
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
                        <img src={eliminar} alt="Eliminar noticia" className={styles.eliminarDoc}/>
                        <img src={noticia} className={styles.iconoDoc} alt="Icono noticia" />
                    </>
                }
            </div>
            <p>{props.nuevo ? "" : props.titular}</p>
        </div>
    )
}

export default Noticia