import { Dispatch, SetStateAction, useState } from "react"
import styles from "./FormularioContacto.module.css"
import UsuarioAPI from "../../services/users"

const api = new UsuarioAPI()

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

function Formulario(props: Props) {

    let detalles = "Titulares: " + props.titulares + "\n" + 
    "Edad: " + props.edad + " años \n" +
    "Ingresos: " + props.ingresos + " €/mes \n" +
    "Deudas: " + (props.deudas === "0" ? "No \n" : (props.deudas + " €\n")) + 
    "Casa encontrada: " + props.sabeCasa + "\n" + 
    "Capital necesario: " + props.precio + " € \n" +
    "Plazo: " + props.anyos + " años \n" + 
    "Código postal: " + props.provincia + "\n" + 
    "Uso de vivienda: " + props.uso + "\n" +
    "Tipo de vivienda: " + props.tipoVivienda

    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [descripcion, setDescripcion] = useState(detalles)

    return(
        <div className={styles.formulario}>
            <h2>Rellena el formulario</h2>
            <div className={styles.datos}>
                <input type="text" id="nombre" name="Nombre" placeholder="Nombre*" required value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                <input type="text" id="apellidos" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)}/>
                <input type="text" id="correo" placeholder="Correo electrónico*" value={correo} required onChange={(e) => setCorreo(e.target.value)}/>
                <input type="text" id="telefono" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                <textarea id="descripcion" cols={30} rows={10} placeholder="Descripción*" required value={props.simulado ? descripcion : ""} onChange={(e) => setDescripcion(e.target.value)}></textarea>

                <div>
                    <input type="checkbox" name="checkbox" id={styles.checkbox} required/>
                    <label htmlFor={styles.checkbox}>He leído y acepto la política de privacidad y las condiciones de uso*</label>
                </div>

                <button onClick={async() => await api.enviarFormulario(nombre, apellidos, correo, telefono, descripcion, props.setUrl)}>ENVIAR</button>
            </div>
        </div>
    )
}

export default Formulario