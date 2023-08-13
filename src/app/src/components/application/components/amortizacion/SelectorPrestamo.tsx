import { Dispatch, SetStateAction, useState } from "react"
import ListaPrestamos from "./Amortizacion";
import styles from "../../../../css/application/Amortizacion.module.css"
import NuevoPrestamo from "./NuevoPrestamo";
import Prestamo from "./Prestamo";

function setPaginaPrestamo(pagina:number, setPagina: Dispatch<SetStateAction<number>>, setNombrePrestamo: Dispatch<SetStateAction<string>>) {
    switch (pagina) {
        case 0:
            return <ListaPrestamos setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
        case 1:
            return <NuevoPrestamo setPagina={setPagina} />
        case 2:
            return <Prestamo setPagina={setPagina} />
        default:
            break;
    }
    
}

function cambiarTituloSelector(pagina: number, nombrePrestamo: string) {
    switch (pagina) {
        case 0:
            return "Seleccionar préstamo"
        case 1:
            return "Nuevo préstamo"
        case 2:
            return nombrePrestamo
        default:
            break;
    }
}

function SelectorPrestamo() {
    const [pagina, setPagina] = useState(0)
    const [nombrePrestamo, setNombrePrestamo] = useState("")

    
    return (
        <div className={styles.amortizacion}>
            <h1>{cambiarTituloSelector(pagina, nombrePrestamo)}</h1>
            <div className={styles.listaPrestamos}>
                {setPaginaPrestamo(pagina, setPagina, setNombrePrestamo)}
            </div>
        </div>
    )
}

export default SelectorPrestamo