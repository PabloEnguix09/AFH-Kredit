import Formulario from "./Formulario";
import styles from "./FormularioContacto.module.css"
import Alternativos from "./Alternativos";

function FormularioContacto() {
    return(
        <div className={styles.contacto}>
            <h1>Contacto</h1>
            <div className={styles.metodos}>
                <Formulario />
                <Alternativos />
            </div>
        </div>
    )
}

export default FormularioContacto