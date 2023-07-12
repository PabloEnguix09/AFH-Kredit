import { Link } from "react-router-dom";
import styles from "../../css/blog.module.css"

import defaultImg from "../../img/Placeholder_image.svg"


interface Props {
    imageUrl?: string,
    titulo: string,
    subtitulo: string,
    autor: string,
    fecha: Date
}

function Titular(props: Props) {
    let imagen;
    if(props.imageUrl) {
        imagen = require(props.imageUrl)
    }
    return(
        <Link to={"/blog/"+props.titulo} className={styles.noticia}>
            <div className={styles.titular}>
                <img src={imagen || defaultImg} alt={props.titulo} />
                <div>
                    <p className={styles.titulo}>{props.titulo}</p>
                    <span className={styles.subtitulo}>{props.subtitulo}</span>
                    <div className={styles.datosNoticia}>
                        <span >{props.autor}</span>
                        <span>{props.fecha.toDateString()}</span>
                    </div>
                </div>
            </div>
        </Link>
        
    )
}

export default Titular