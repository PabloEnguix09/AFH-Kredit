import { Dispatch, SetStateAction, useEffect, useState } from "react"
import TextInputSim from "../../../simulador/TextInputSim"
import styles from "../../../../css/application/Amortizacion.module.css"
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../../../js/firebaseApp"
import { User } from "firebase/auth"

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

interface Props {
    userData: User,
    setPagina: Dispatch<SetStateAction<number>>,
    prestamos: IPrestamo[] | undefined,
}

interface Mensualidad {

    mes: number,
    cuota: number,
    intereses: number,
    principal: number,
    restante: number,
    pagado: boolean
}

async function calcularPrestamo(nombre: string, capital: number, interes: number, anyos: number, 
    userData: User, prestamos: IPrestamo[] | undefined, setPagina: Dispatch<SetStateAction<number>>) {
    
    if(nombre !== "" && capital !== 0 && anyos !== 0) {
        let mensualidades = calcular(capital, interes, anyos)
        let userRef = doc(db, "usuarios", userData.email!)

        let prestamo : IPrestamo = {"mensualidades": mensualidades, "nombre": nombre}

        if(prestamos === undefined) {
            prestamos = []
        }
        prestamos.push(prestamo)

        await updateDoc(userRef, {"prestamos": prestamos}).then(() => {
            setPagina(0)
        })
        
    }
}

function calcular(capital: number, interes: number, anyos: number) {
    let capitalRestante = capital
    let interesesTotales = 0
    let totalAmortizado = 0

    let cuotaMensual = []
    let interesMensual = []
    let amortizacionMensual = []
    
    let detalles : Mensualidad[] = []

    cuotaMensual.push(0)
    interesMensual.push(0)
    amortizacionMensual.push(0)    

    for (let i = 1; i <= anyos*12; i++) {        
            cuotaMensual.push(toDosDigitos(calcularMensualidad(capital, interes, anyos)))
            interesMensual.push(toDosDigitos(calcularInteresMensual(capital, totalAmortizado, interes)))
            amortizacionMensual.push(toDosDigitos(calcularAmortizadoMensual(cuotaMensual[i], interesMensual[i])))

            capitalRestante -= cuotaMensual[i]
            interesesTotales += interesMensual[i]
            totalAmortizado += amortizacionMensual[i]

            detalles.push({
                mes: i, 
                cuota: cuotaMensual[i], 
                intereses: interesMensual[i], 
                principal: amortizacionMensual[i], 
                restante: toDosDigitos(capital - totalAmortizado),
                pagado:false
            }) 
    }

    return detalles
}

function toDosDigitos(numero:number) {
    return Math.round(numero * 100) / 100 
}

function calcularMensualidad(capital: number, interes: number, anyos: number): number {
    let prestado = capital
    let interesMensual = interes/1200
    let plazo = anyos
    let denominador = 1-((1+interesMensual)**(-plazo*12))

    let mensualidad = prestado * interesMensual / denominador
    
    if(Number.isNaN(mensualidad) || mensualidad === Infinity) {
        mensualidad = 0
    }
    return mensualidad
}

function calcularInteresMensual(capital: number, cuota: number, interes: number): number {
    return ((capital-cuota)*(interes/100))/12
}

function calcularAmortizadoMensual(cuota: number, intereses: number) {
    return cuota - intereses
}

function  NuevoPrestamo(props: Props) {
    const [nombre, setNombre] = useState<string>("")
    const [capital, setCapital] = useState<number>(0)
    const [interes, setInteres] = useState<number>(3)
    const [anyos, setAnyos] = useState<number>(0)
    
    return(
        <div className={styles.nuevoPrestamo}>
            <div className={styles.datosPrestamo}>
                <div>
                <TextInputSim titulo={"Nombre del préstamo"} explicacion={""} tipo={"text"} placeholder={"Casa"} magnitud={""} valorDefault={nombre} valorDefaultCb={setNombre} disabled={false} />
                <TextInputSim titulo={"Capital inicial"} explicacion={""} tipo={"number"} placeholder={"Capital"} magnitud={"€"} valorDefault={capital} valorDefaultCb={setCapital} disabled={false} />
                </div>

                <div>
                    <TextInputSim titulo={"Intereses"} explicacion={"Fijo: 3%, Variable: 4%, Mixto: 5%"} tipo={"number"} placeholder={"Intereses"} magnitud={"%"} valorDefault={interes} valorDefaultCb={setInteres} disabled={false} />
                    <TextInputSim titulo={"Plazo de amortización"} explicacion={"Máximo fijo: 30 años\nMáximo variable: 40 años"} tipo={"number"} placeholder={"Años"} magnitud={"Años"} valorDefault={anyos} valorDefaultCb={setAnyos} disabled={false} />
                </div>


            </div>

            <button className={styles.anyadirBtn} onClick={() => calcularPrestamo(nombre, capital, interes, anyos, props.userData, props.prestamos, props.setPagina)}>Añadir préstamo</button>
            
        </div>
    )
}

export default NuevoPrestamo