import { IMensualidad, ISimuladorValores } from "../types/simulador.types"
import styles from "../css/simulador.module.css"

export function validarDatos(states: ISimuladorValores) : number {
    
    try {
          for(const [state, value] of Object.entries(states)) {
  
              if(states.sabeCasa === "Sí" && state === "quiereCasa") {
                  continue
              }
  
              if(value === "") {
                  throw new Error("Debe rellenar todos los campos")
              }
          }
          if(parseInt(states.anyos) > 40) 
              throw new Error("El plazo de la hipoteca debe estar entre 10 y 40 años. Si buca algo fuera de estos límites, pida una consulta.")
          if(parseInt(states.anyos) + parseInt(states.edad) > 75)
              throw new Error("Usted debe poder acabar de pagar la hipoteca a los 75 años como máximo. Reduzca el plazo de la hipoteca o pida una consulta.")
  
    } catch (error) {
        alert(error)
        return states.siguiente
    }
    return states.siguiente + 1
  }

function toDosDigitos(numero: number) {
    return Math.round(numero * 100) / 100 
}

export function calcularMensualidad(capital: number, interes: number, anyos: number): number {
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

export function calcularTae(interes : number) {

    let tae = (1+interes/1200)**12-1
    return parseFloat((tae*100).toFixed(2))
}

export function calcular(capital: number, interes: number, anyos: number) {
    let totalAmortizado = 0

    let cuotaMensual = []
    let interesMensual = []
    let amortizacionMensual = []
    
    let detalles : IMensualidad[] = []

    cuotaMensual.push(0)
    interesMensual.push(0)
    amortizacionMensual.push(0)    

    for (let i = 1; i <= anyos*12; i++) {        
            cuotaMensual.push(toDosDigitos(calcularMensualidad(capital, interes, anyos)))
            interesMensual.push(toDosDigitos(calcularInteresMensual(capital, totalAmortizado, interes)))
            amortizacionMensual.push(toDosDigitos(calcularAmortizadoMensual(cuotaMensual[i], interesMensual[i])))

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

export function calcularTotalHipoteca(capital: number, interes: number, anyos: number) {
    let interesesTotales = 0
    let totalAmortizado = 0

    let cuotaMensual = calcularMensualidad(capital, interes, anyos)
    let interesMensual = []
    let amortizacionMensual = []

    interesMensual.push(0)
    amortizacionMensual.push(0)

    for (let i = 1; i < anyos*12; i++) {        
            interesMensual.push(calcularInteresMensual(capital, totalAmortizado, interes))
            amortizacionMensual.push(calcularAmortizadoMensual(cuotaMensual, interesMensual[i]))

            interesesTotales += interesMensual[i]
            totalAmortizado += amortizacionMensual[i]
    }
    return [Math.round(cuotaMensual * 100) / 100, Math.round(interesesTotales * 100) /100]
}

export function seleccionarOpcion (id: string) {
    const opciones = document.getElementsByClassName(styles.opcionHipoteca)

    for (let i = 0; i < opciones.length; i++) {
        const opcion = opciones[i];
        
        if(opcion.classList.contains(styles.opcionSeleccionada) && opcion.id === id) {
            
            opcion.classList.remove(styles.opcionSeleccionada)
            return
        }
        else if (opcion.classList.contains(styles.opcionSeleccionada)) {
            opcion.classList.remove(styles.opcionSeleccionada)
        }
        
    }

    const opcion = document.getElementById(id)
    opcion?.classList.add(styles.opcionSeleccionada)
}