import styles from "../../../../css/application/Documentos.module.css"
import docs from "../../../../img/application/docs.svg"
import nuevo from "../../../../img/icono_mas.svg"

import eliminar from "../../../../img/application/eliminar.svg"

interface Props {
    nuevo: boolean,
    nombreDoc: string
}

function Doc(props: Props) {
    return(
        <div className={styles.doc}>
            <div>
                {props.nuevo 
                ?
                    <>
                    <img className={`${styles.nuevo} ${styles.iconoDoc}`} src={nuevo} alt="Nuevo documento" />
                    <p>Nuevo documento</p>
                    </>
                : 
                    <>
                        <img src={eliminar} alt="Eliminar documento" className={styles.eliminarDoc}/>
                        <img src={docs} className={styles.iconoDoc} alt="Icono documento" />
                    </>
                }
            </div>
            <p>{props.nuevo ? "" : props.nombreDoc}</p>
        </div>
    )
}

export default Doc