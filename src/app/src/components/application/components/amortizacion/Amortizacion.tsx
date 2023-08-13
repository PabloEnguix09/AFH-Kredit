import styles from "../../../../css/application/Amortizacion.module.css"
import PrestamoLista from "./PrestamoLista"
import utils from "../../../../js/utils"
import { Dispatch, SetStateAction, useEffect } from "react"

interface Props {
    setPagina: Dispatch<SetStateAction<number>>,
    setNombrePrestamo: Dispatch<SetStateAction<string>>
}

function ListaPrestamos({setPagina, setNombrePrestamo}:Props) {

    useEffect(() => {
        utils.checkIfScrollable(styles.lista)
    }, [])
    

    return(
        <div className={styles.lista}>
                <PrestamoLista nuevo={true} nombrePrestamo={""} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>

                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>
                <PrestamoLista nuevo={false} nombrePrestamo={"Casa"} setPagina={setPagina} setNombrePrestamo={setNombrePrestamo}/>


        </div>
    )
}

export default ListaPrestamos