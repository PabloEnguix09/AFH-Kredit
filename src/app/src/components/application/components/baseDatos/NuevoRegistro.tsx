import { Dispatch, SetStateAction, useState } from "react"
import styles from "../../../../css/application/BaseDatos.module.css"
import { DocumentData, collection, doc, setDoc } from "firebase/firestore"
import TextInputSim from "../../../simulador/TextInputSim"
import { db } from "../../../../js/firebaseApp"

interface Tabla {
    displayName: string,
    valores: DocumentData
    uid: string
}

interface Props {
    tabla: Tabla,
    pagina: number, 
    setPagina: Dispatch<SetStateAction<number>>
}

async function anyadirRegistro(nombreTabla: string, nombre: string, valor: string, setPagina: Dispatch<SetStateAction<number>>) {
    switch (nombreTabla) {
        case "intereses": 
        case "financiacion":
            const dbRef = doc(collection(db, "baseDatos"), nombreTabla)
            await setDoc(dbRef, {[nombre]: parseFloat(valor)}, {merge: true}).then(() => {
                setPagina(1)
            })
            break;
        case "usuarios":
            break;
        default:
            break;
    }
}

function setNuevoRegistroInputs(nombreTabla: string, 
    pagina: number, setPagina: Dispatch<SetStateAction<number>>,
    nuevoNombre: string, setNuevoNombre: Dispatch<SetStateAction<string>>,
    nuevoValor: string, setNuevoValor: Dispatch<SetStateAction<string>>,
    nuevoApellido: string, setNuevoApellido: Dispatch<SetStateAction<string>>,
    nuevoCorreo: string, setNuevoCorreo: Dispatch<SetStateAction<string>>,
    nuevoTelefono: string, setNuevoTelefono: Dispatch<SetStateAction<string>>) {
    switch (nombreTabla) {
        case "intereses":
            return (
                <div className={styles.crearNuevoRegistro}>
                    <div className={styles.nuevoRegistroInputs}>
                        <TextInputSim titulo={"Nombre del interés"} explicacion={"Escriba el nombre del banco y para qué tipo de préstamo aplica en el siguiente estilo: banco_tipo"} tipo={"text"} placeholder={"banco_tipo"} magnitud={""} valorDefault={nuevoNombre} valorDefaultCb={setNuevoNombre} disabled={false} />
                        <TextInputSim titulo={"Valor del interés"} explicacion={"Escriba el interés de este banco"} tipo={"number"} placeholder={""} magnitud={"%"} valorDefault={nuevoValor} valorDefaultCb={setNuevoValor} disabled={false} />
                    </div>
                    <div className={styles.nuevoRegistroInputs}>
                        <button className={styles.cancelarBoton} onClick={() => setPagina(1)}>Cancelar</button>
                        <button className={styles.nuevoRegistroBoton} onClick={() => anyadirRegistro(nombreTabla, nuevoNombre, nuevoValor, setPagina)}>Añadir registro</button>
                    </div>
                </div>
            )
        case "financiacion": 
        return (
            <div className={styles.crearNuevoRegistro}>
                <div className={styles.nuevoRegistroInputs}>
                    <TextInputSim titulo={"Nombre del banco"} explicacion={"Escriba el nombre del banco que quiere añadir"} tipo={"text"} placeholder={"banco"} magnitud={""} valorDefault={nuevoNombre} valorDefaultCb={setNuevoNombre} disabled={false} />
                    <TextInputSim titulo={"Valor de financiación"} explicacion={"Escriba el porcentaje de financiación de este banco"} tipo={"number"} placeholder={""} magnitud={"%"} valorDefault={nuevoValor} valorDefaultCb={setNuevoValor} disabled={false} />
                </div>
                <div className={styles.nuevoRegistroInputs}>
                    <button className={styles.cancelarBoton} onClick={() => setPagina(1)}>Cancelar</button>
                    <button className={styles.nuevoRegistroBoton} onClick={() => anyadirRegistro(nombreTabla, nuevoNombre, nuevoValor, setPagina)}>Añadir registro</button>
                </div>
                
            </div>
        )
        case "usuarios":
            return (
                <div className={styles.crearNuevoRegistro}>
                    <div className={styles.nuevoRegistroInputs}>
                        <TextInputSim titulo={"Nombre"} explicacion={"Escriba el nombre del usuario"} tipo={"text"} placeholder={"Nombre*"} magnitud={""} valorDefault={nuevoNombre} valorDefaultCb={setNuevoNombre} disabled={false} />
                        <TextInputSim titulo={"Apellidos"} explicacion={"Escriba el/los apellido(s) del usuario"} tipo={"text"} placeholder={"Apellidos"} magnitud={""} valorDefault={nuevoApellido} valorDefaultCb={setNuevoApellido} disabled={false} />
                    </div>
                    <div className={styles.nuevoRegistroInputs}>
                        <TextInputSim titulo={"Correo electrónico"} explicacion={"Escriba el correo electrónico del usuario"} tipo={"text"} placeholder={"Correo electrónico*"} magnitud={""} valorDefault={nuevoCorreo} valorDefaultCb={setNuevoCorreo} disabled={false} />
                        <TextInputSim titulo={"Teléfono"} explicacion={"Escriba el número de teléfono del usuario"} tipo={"text"} placeholder={"Teléfono"} magnitud={""} valorDefault={nuevoTelefono} valorDefaultCb={setNuevoTelefono} disabled={false} />
                    </div>
                    <div className={styles.nuevoRegistroInputs}>
                        <button className={styles.cancelarBoton} onClick={() => setPagina(1)}>Cancelar</button>
                        <button className={styles.nuevoRegistroBoton} onClick={() => anyadirRegistro(nombreTabla, nuevoNombre, nuevoValor, setPagina)}>Añadir registro</button>
                    </div>
                    
                </div>
            )
        default:
            break;
    }
}

function NuevoRegistro(props: Props) {
    const [nuevoNombre, setNuevoNombre] = useState("")
    const [nuevoApellido, setNuevoApellido] = useState("")
    const [nuevoCorreo, setNuevoCorreo] = useState("")
    const [nuevoTelefono, setNuevoTelefono] = useState("")
    const [nuevoValor, setNuevoValor] = useState("")

    return(
        <div className={styles.listaTabla}>
            <h2>Nuevo registro: {props.tabla.displayName}</h2>
            {setNuevoRegistroInputs(props.tabla.displayName, 
                props.pagina, props.setPagina, 
                nuevoNombre, setNuevoNombre, 
                nuevoValor, setNuevoValor,
                nuevoApellido, setNuevoApellido,
                nuevoCorreo, setNuevoCorreo,
                nuevoTelefono, setNuevoTelefono)}
        </div>
    )
}

export default NuevoRegistro