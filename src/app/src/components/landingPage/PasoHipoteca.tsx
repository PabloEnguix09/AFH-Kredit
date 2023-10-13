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
            <div>
                <h2>{titulo}</h2>
                <span>{texto}</span>
            </div>
        </div>
    )
}

export default Paso