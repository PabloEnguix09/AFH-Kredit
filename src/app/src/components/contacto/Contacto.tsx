import Formulario from "./Formulario";
import styles from "./FormularioContacto.module.css"
import Alternativos from "./Alternativos";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setUrl: Dispatch<SetStateAction<string>>
}

function FormularioContacto(props: Props) {
    return(
        <div className={styles.contacto}>
            <h1>Contacto</h1>
            <div className={styles.metodos}>
                <Formulario simulado={false} titulares={""} edad={""} ingresos={""} deudas={""} sabeCasa={""} precio={""} provincia={""} quiereCasa={""} uso={""} tipoVivienda={""} anyos={""} setUrl={props.setUrl} />
                <Alternativos />
            </div>
        </div>
    )
}

export default FormularioContacto