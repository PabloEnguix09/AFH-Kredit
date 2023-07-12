import styles from "./Landing.module.css";

interface Props {
    numero: string,
    titulo: string,
    texto: string
}

function Paso({numero, titulo, texto}:Props) {
    return (
        <div className={styles.paso}>
            <p className={styles.numeroPaso}>{numero}</p>
            <h3>{titulo}</h3>
            <span>{texto}</span>
        </div>
    )
}

export default Paso