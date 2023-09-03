import defaultImg from "../../../../img/application/default-profile.svg"
import styles from "../../../../css/application/AppChat.module.css"

interface Props {
    imagenContacto: string,
    nombre: string,
    telf: string | undefined
}

function InfoContacto(props: Props) {
    
    const imagen = props.imagenContacto !== "" ? props.imagenContacto : defaultImg

    return (
        <div className={styles.infoContacto}>
            <img src={imagen} alt="Icono contacto" />
            <div className={styles.datosContacto}>
                <p>{props.nombre}</p>
                <span style={{visibility: props.telf !== undefined ? "visible" : "hidden"}}>{props.telf}</span>
            </div>
        </div>
    )
}

export default InfoContacto