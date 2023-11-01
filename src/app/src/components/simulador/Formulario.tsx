import {useEffect, useState} from 'react'
import RadioInputSim from './RadioInputSim'
import TextInputSim from './TextInputSim'
import styles from "../../css/simulador.module.css"
import iconoUser from "../../img/User.svg"
import { ISimuladorEstados } from '../../types/simulador.types'
import { validarDatos } from '../../js/simulador'
import SimuladorAPI from '../../services/simulador'

const api = new SimuladorAPI()

const Formulario = (props: ISimuladorEstados) => {

  const estados = {
    titular: props.titular.estado,
    edad: props.edad.estado,
    ingresos: props.ingresos.estado,
    deudas: props.deudas.estado,
    sabeCasa: props.sabeCasa.estado,
    precio: props.precio.estado,
    necesitas: props.necesitas.estado,
    provincia: props.provincia.estado,
    quiereCasa: props.quiereCasa.estado,
    uso: props.uso.estado,
    tipoVivienda: props.tipoVivienda.estado,
    anyos: props.anyos.estado,
    siguiente: props.siguiente.estado
  }

  const [cpCorrecto, setCpCorrecto] = useState(false)
  const [provinciaCp, setProvinciaCp] = useState("")

  useEffect(() => {
    if(estados.provincia.length === 5) {
        const cambiarProvincia = async() => {
            let provincias = await api.verCSV()
            let provinciaCorrecta = provincias.filter((provincia) => {return provincia.codigo === estados.provincia.slice(0, 2)})[0]
            if(provinciaCorrecta !== undefined) {
                setProvinciaCp(provinciaCorrecta.provincia)
            }
            else {
                setProvinciaCp("El código postal no existe")

            }
            setCpCorrecto(true)
        }
        cambiarProvincia()
    }
    else {
        setCpCorrecto(false)
    }
    
  }, [estados.provincia])
  
  
  return (
    <div id={styles.datosFormulario}>
        <div className={styles.formulario}>
            <div className={styles.datosPersonales}>
                <div>
                    <img src={iconoUser} alt="" />
                    <h2>Datos personales</h2>
                </div>
                <div className={styles.datos}>
                    <div>
                        <RadioInputSim titulo={"¿Cuántos titulares va a tener la hipoteca?"} opcion1={"Uno"} opcion2={"Más de uno"} estadoCb={props.titular.cb} estado={props.titular.estado} />
                        <TextInputSim titulo={"¿Qué edad tienes?"} explicacion={"Indica la edad del titular más mayor"} tipo={"number"} placeholder={"Edad"} magnitud={""} valorDefault={props.edad.estado} valorDefaultCb={props.edad.cb} disabled={false} />
                        <TextInputSim titulo={"¿Cuáles son tus ingresos?"} explicacion={"Suma cuánto dinero neto ingresas en un mes"} tipo={"number"} placeholder={"Total"} magnitud={"€"} valorDefault={props.ingresos.estado} valorDefaultCb={props.ingresos.cb} disabled={false}  />
                    </div>
                    <div>
                    <TextInputSim titulo={"¿Tienes otros préstamos?"} explicacion={"En caso afirmativo, indica la suma de todas las cuotas mensuales. Ten en cuenta otros pagos tales como pensiones de manutención"} tipo={"number"} placeholder={"Total"} magnitud={"€"} valorDefault={props.deudas.estado} valorDefaultCb={props.deudas.cb} disabled={false}  />
                    </div>
                </div>
            </div>
    
            <hr />
            <div className={styles.prestamo}>
                <div>
                    <img src={iconoUser} alt="" />
                    <h2>Sobre tu préstamo</h2>
                </div>
                <div className={styles.datos}>
                    <div>
                        <RadioInputSim titulo={"¿Ya tienes tu vivienda?"} opcion1={"Sí"} opcion2={"No"} estadoCb={props.sabeCasa.cb} estado={props.sabeCasa.estado} />
                        <TextInputSim titulo={"¿Cuánto cuesta?"} explicacion={""} tipo={"number"} placeholder={"Total"} magnitud={"€"} valorDefault={props.precio.estado} valorDefaultCb={props.precio.cb} disabled={false}  />
                        <TextInputSim titulo={"¿Cuánto necesitas?"} explicacion={""} tipo={"number"} placeholder={"Total"} magnitud={"€"} valorDefault={props.necesitas.estado} valorDefaultCb={props.necesitas.cb} disabled={false}  />
                        <TextInputSim titulo={"¿Dónde está?"} explicacion={"Introduzca el código postal de su localidad"} tipo={"number"} placeholder={"Código postal"} magnitud={""} valorDefault={props.provincia.estado} valorDefaultCb={props.provincia.cb} disabled={false} />
                        <p style={{visibility: cpCorrecto ? "visible" : "hidden", textAlign: "center", fontWeight: "bold", fontSize: "1.25vw", marginTop: "1vh"}}>{provinciaCp}</p>

                    </div>
                    <div>
                        <RadioInputSim titulo={"¿Cuál va a ser el uso de la vivienda?"} opcion1={"Vivienda habitual"} opcion2={"Segunda o inversión"} estadoCb={props.uso.cb} estado={props.uso.estado} />
                        <RadioInputSim titulo={"¿Qué tipo de vivienda es?"} opcion1={"Segunda mano"} opcion2={"Nueva construcción"} estadoCb={props.tipoVivienda.cb} estado={props.tipoVivienda.estado} />
                        <TextInputSim titulo={"¿Cuántos años necesitas?"} explicacion={"Máximo 40 años"} tipo={"number"} placeholder={"Años"} magnitud={""} valorDefault={props.anyos.estado} valorDefaultCb={props.anyos.cb} disabled={false}  />
                    </div>
                </div>
            </div>
        </div>
    
        <button onClick={() => props.siguiente.cb(validarDatos(estados))}>CALCULAR</button>
    </div>
  )
}

export default Formulario