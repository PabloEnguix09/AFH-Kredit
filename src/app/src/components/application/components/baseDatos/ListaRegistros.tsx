import { DocumentData } from "firebase/firestore"
import styles from "../../../../css/application/BaseDatos.module.css"
import Registro from "./Registro"
import { Dispatch, SetStateAction } from "react"

interface Props {
    tabla: Tabla,
    pagina: number, 
    setPagina: Dispatch<SetStateAction<number>>
}

interface Tabla {
    displayName: string,
    valores: DocumentData
    uid: string
}

interface Usuario {
    nombre: string,
    apellidos: string,
    email: string,
    contactos: string[]
    rol: string,
    prestamos?: Object[]
}

function setRegistros(listaRegistros: Tabla, pagina: number, setPagina: Dispatch<SetStateAction<number>>) {
    
    let lista;
    if (listaRegistros.displayName === "usuarios") {
        lista = Object.entries(listaRegistros.valores).map((registro) => {
            let datos: Usuario = registro[1].data()
            console.log(datos);
            return <Registro nuevo={false} nombre={datos.email} nombreTabla={"usuarios"} valor={""} magnitud={""} pagina={pagina} setPagina={setPagina} />
        })
    }
    else {
        lista = Object.entries(listaRegistros.valores).map((registro) => {
            return <Registro nuevo={false} nombre={registro[0]} valor={registro[1]} magnitud={"%"} key={registro[0]} nombreTabla={listaRegistros.displayName} pagina={pagina} setPagina={setPagina} />
        })
    }
    
    return lista
}

function ListaRegistros(props:Props) {
    return(
        <div className={styles.listaTabla}>
            <h2>{props.tabla.displayName}</h2>
                <div>
                    <Registro nuevo={true} nombre={""} valor={""} magnitud={""} key={"nuevoRegistro"} nombreTabla={props.tabla.displayName} pagina={props.pagina} setPagina={props.setPagina} />
                    {setRegistros(props.tabla, props.pagina, props.setPagina)}
                </div>
        </div>
    )
}

export default ListaRegistros