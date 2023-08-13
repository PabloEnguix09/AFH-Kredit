import styles from "../../../css/application/Ajustes.module.css"
import iconoMas from "../../../img/icono_mas.svg"
import iconoMenos from "../../../img/icono_menos.svg"

interface Props {
    nombre: string,
    logo: string,
    vinculada: boolean
}

function CuentaVinculada(props: Props) {
    return(
        <div className={styles.cuenta}>
            <img src={props.logo} alt={`Logo ${props.nombre}`} />
            <p>{props.nombre}</p>
            {props.vinculada ? <img src={iconoMenos} alt={`Desvincular cuenta ${props.nombre}`} /> : <img className={styles.noVinculada} src={iconoMas} alt={`Vincular cuenta ${props.nombre}`} />}
        </div>
    )
}

export default CuentaVinculada