import { Dispatch, SetStateAction, useState } from "react"
import styles from "../../../../css/application/BaseDatos.module.css"
import eliminar from "../../../../img/application/eliminar.svg"
import tick from "../../../../img/application/tick.svg"
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore"
import { auth, db } from "../../../../js/firebaseApp"
import iconoMas from "../../../../img/icono_mas.svg"
import { deleteUser } from "firebase/auth"

interface Props {
    nuevo: boolean,
    nombre: string,
    nombreTabla: string
    valor: number | string,
    magnitud: string,
    pagina: number,
    setPagina: Dispatch<SetStateAction<number>>
}

async function updateRegistro(nombreTabla:string, valor: number | string, nombreRegistro: string, setIsValueChanged: Dispatch<SetStateAction<boolean>>) {

    const dbRef = doc(db, "baseDatos", nombreTabla)
    await updateDoc(dbRef, {[nombreRegistro]: typeof(valor) === "number" ? valor : parseFloat(valor)}).then(() => {
        setIsValueChanged(false)
    })
}

async function deleteRegistro(nombreTabla: string, nombreRegistro: string, setIsBorrado: Dispatch<SetStateAction<boolean>>) {
    const dbRef = doc(db, "baseDatos", nombreTabla)
    await updateDoc(dbRef, {[nombreRegistro]: deleteField()}).then(() => {
        setIsBorrado(true)
    })
}

async function deleteUsuario(email: string, setIsBorrado: Dispatch<SetStateAction<boolean>>) {
    alert("Funcion no implementada")
}

function Registro(props:Props) {

    const [isValueChanged, setIsValueChanged] = useState(false)
    const [valor, setValor] = useState(props.valor)
    const [isBorrado, setIsBorrado] = useState(false)

    return(
        <>
        {isBorrado 
            ? 
                <></>
            :
            <div className={styles.registro}>
            {props.nuevo
                ? 
                <div style={{width: "47rem", display: "flex", justifyContent: "center", cursor: "pointer"}} onClick={() => props.setPagina(2)}>
                    <img src={iconoMas} alt="Nuevo registro" />
                    <p>Nuevo registro</p>
                </div>
                :  
                <>
                {props.nombreTabla === "usuarios" 
                ?
                    <>
                    <p style={{minWidth: "0px"}}>{props.nombre}</p>
                    <img src={eliminar} alt="Eliminar registro" className={styles.eliminar} onClick={async() => await deleteUsuario(props.nombre, setIsBorrado)}/>

                    </>
                :
                    <>
                        <p>{props.nombre}:</p>
                        <div>
                            {typeof(props.valor) === "number" 
                            ? 
                            <input type="number" value={valor} onChange={(e) => {
                                setIsValueChanged(true) 
                                setValor(e.currentTarget.value)
                            }}/>
                            :
                            <input type="text" value={valor} onChange={(e) => {
                                setIsValueChanged(true) 
                                setValor(e.currentTarget.value)
                            }}/>
                            }
                            <span>{props.magnitud}</span>
                        </div>
                        
                        {isValueChanged 
                        ? 
                        <img src={tick} alt="Confirmar cambios" className={styles.tick} onClick={async() => await updateRegistro(props.nombreTabla, valor, props.nombre, setIsValueChanged)} />
                        : 
                        <></>
                        }
                        <img src={eliminar} alt="Eliminar registro" className={styles.eliminar} onClick={async() => await deleteRegistro(props.nombreTabla, props.nombre, setIsBorrado)}/>
                    </>
                }
                </>
            }
            </div>
        }
        </>
    )
}

export default Registro