interface Mensualidad {

    mes: number,
    cuota: number,
    intereses: number,
    principal: number,
    restante: number,
    pagado: boolean
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

export function calcular(capital: number, interes: number, anyos: number) {
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