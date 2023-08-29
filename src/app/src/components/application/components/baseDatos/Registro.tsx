import { Dispatch, SetStateAction, useState } from "react"
import styles from "../../../../css/application/BaseDatos.module.css"
import eliminar from "../../../../img/application/eliminar.svg"
import tick from "../../../../img/application/tick.svg"
import { collection, deleteField, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../../../js/firebaseApp"

interface Props {
    nombre: string,
    nombreTabla: string
    valor: number | string,
    magnitud: string
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
            </div>
        }
        </>
    )
}

export default Registro