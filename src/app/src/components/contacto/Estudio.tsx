import Formulario from "./Formulario";
import styles from "./FormularioContacto.module.css"
import Alternativos from "./Alternativos";
import { Dispatch, SetStateAction } from "react";

interface Props {
    simulado: boolean,
    titulares: string,
    edad: string,
    ingresos: string,
    deudas: string,
    sabeCasa: string,
    precio: string,
    provincia: string,
    quiereCasa: string,
    uso: string,
    tipoVivienda: string,
    anyos: string,
    setUrl: Dispatch<SetStateAction<string>>
}

function FormularioEstudio(props:Props) {
    return(
        <div className={styles.contacto}>
            <h1>Solicitar estudio</h1>
            <div className={styles.metodos}>
                <Formulario simulado={true} titulares={props.titulares} edad={props.edad} ingresos={props.ingresos} deudas={props.deudas} sabeCasa={props.sabeCasa} precio={props.precio} provincia={props.provincia} quiereCasa={props.quiereCasa} uso={props.uso} tipoVivienda={props.tipoVivienda} anyos={props.anyos} setUrl={props.setUrl}/>
                <Alternativos />
            </div>
        </div>
    )
}

export default FormularioEstudio