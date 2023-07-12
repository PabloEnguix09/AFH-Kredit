import styles from "../../css/simulador.module.css"

interface Props {
    titulo: string,
    explicacion: string,
    tipo: string,
    placeholder: string,
    magnitud: string,
} 

function TextInputSim({titulo, explicacion, tipo, placeholder, magnitud}: Props) {
    return(
        <div className={styles.textInput}>
            <p className={styles.titulo}>{titulo}</p>
            <span className={styles.explicacion}>{explicacion}</span>
            <div>
                <input type={tipo} name={placeholder} placeholder={placeholder} />
                <span className={styles.magnitud}>{magnitud}</span>
            </div>
        </div>
    )
}

export default TextInputSim