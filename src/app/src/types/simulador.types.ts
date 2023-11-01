import { Dispatch, SetStateAction } from "react"

export interface ISimuladorEstado {
    estado: string,
    cb: Dispatch<React.SetStateAction<string>>
}

export interface ISimuladorEstados {
    titular: ISimuladorEstado
    edad: ISimuladorEstado,
    ingresos: ISimuladorEstado,
    deudas: ISimuladorEstado,
    sabeCasa: ISimuladorEstado,
    precio: ISimuladorEstado,
    necesitas: ISimuladorEstado,
    provincia: ISimuladorEstado,
    quiereCasa: ISimuladorEstado,
    uso: ISimuladorEstado,
    tipoVivienda: ISimuladorEstado,
    anyos: ISimuladorEstado,

    siguiente: {
        estado: number,
        cb: Dispatch<SetStateAction<number>>
    }
}

export interface ISimuladorValores {
    titular: string,
    edad: string,
    ingresos: string,
    deudas: string,
    sabeCasa: string,
    precio: string,
    necesitas: string,
    provincia: string,
    quiereCasa: string,
    uso: string,
    tipoVivienda: string,
    anyos: string,
    siguiente: number
}

export interface IProvincia {
    codigo: string, 
    provincia: string
}

export interface IMensualidad {
    mes: number,
    cuota: number,
    intereses: number,
    principal: number,
    restante: number,
    pagado: boolean
}