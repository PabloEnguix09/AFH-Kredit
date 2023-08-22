import styles from "../../../../css/application/Amortizacion.module.css"
import PrestamoLista from "./PrestamoLista"
import utils from "../../../../js/utils"
import { Dispatch, SetStateAction, useEffect } from "react"

interface Props {
    prestamos: IPrestamo[],
    setPagina: Dispatch<SetStateAction<number>>,
    setNombrePrestamo: Dispatch<SetStateAction<string>>
}

interface Mensualidad {

    mes: number,
    cuota: number,
    intereses: number,
    principal: number,
    restante: number,
    pagado: boolean
}

interface IPrestamo {
    nombre: string,
    mensualidades: Mensualidad[]
}

function renderPrestamos({prestamos, setPagina, setNombrePrestamo}:Props) {
    return prestamos.map((prestamo) => {
        return <PrestamoLista nuevo={false} nombrePrestamo={prestamo.nombre} prestamoDatos={prestamo.mensualidades} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo} />
    })
}

function ListaPrestamos({setPagina, setNombrePrestamo, prestamos}:Props) {

    useEffect(() => {
        utils.checkIfScrollable(styles.lista)
    }, [])
    

    return(
        <div className={styles.lista}>
                <PrestamoLista nuevo={true} nombrePrestamo={""} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo} prestamoDatos={[]}/>
                {renderPrestamos({prestamos, setPagina, setNombrePrestamo})}

        </div>
    )
}

export default ListaPrestamos