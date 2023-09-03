import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ListaPrestamos from "./Amortizacion";
import styles from "../../../../css/application/Amortizacion.module.css"
import NuevoPrestamo from "./NuevoPrestamo";
import Prestamo from "./Prestamo";
import { User } from "firebase/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../js/firebaseApp";

function setPaginaPrestamo(
    userData: User, pagina:number, 
    setPagina: Dispatch<SetStateAction<number>>, 
    prestamos: IPrestamo[] | undefined,
    nombrePrestamo: string, setNombrePrestamo: Dispatch<SetStateAction<string>>) {
    if(prestamos) {
        switch (pagina) {
            case 0:
                return <ListaPrestamos setPagina={setPagina} setNombrePrestamo={setNombrePrestamo} prestamos={prestamos}/>
            case 1:
                return <NuevoPrestamo userData={userData} setPagina={setPagina} prestamos={prestamos}/>
            case 2:
                return <Prestamo setPagina={setPagina} prestamos={prestamos.find((prestamo) => {return prestamo.nombre === nombrePrestamo})!} />
            default:
                break;
        }
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

interface Props {
    userData: User
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

function SelectorPrestamo(props: Props) {
    const [pagina, setPagina] = useState(0)
    const [nombrePrestamo, setNombrePrestamo] = useState("")
    const [prestamos, setPrestamos] = useState<IPrestamo[]>([])

    useEffect(() => {
        const getPrestamos = async() => {
            await getDocs(query(collection(db, "usuarios"), where("email", "==", props.userData.email))).then(async(res) => {
                let user = res.docs[0].data()
                let prestamos : IPrestamo[] = user.prestamos
                setPrestamos(prestamos)
            })
        }
        getPrestamos()
    }, [])
    
    return (
        <div className={styles.amortizacion}>
            <h1>{cambiarTituloSelector(pagina, nombrePrestamo)}</h1>
            <div className={styles.listaPrestamos}>
                {setPaginaPrestamo(props.userData, pagina, setPagina, prestamos, nombrePrestamo, setNombrePrestamo)}
            </div>
        </div>
    )
}

export default SelectorPrestamo