import React, {Dispatch, useEffect, useState} from 'react'
import RadioInputSim from './RadioInputSim'
import TextInputSim from './TextInputSim'
import styles from "../../css/simulador.module.css"
import iconoUser from "../../img/User.svg"
import { Buffer } from "buffer";

interface Estado {
  estado: string,
  cb: Dispatch<React.SetStateAction<string>>
}

interface Props {
  titular: Estado,
  edad: Estado,
  ingresos: Estado,
  deudas: Estado,
  sabeCasa: Estado,
  precio: Estado,
  provincia: Estado,
  quiereCasa: Estado,
  uso: Estado,
  tipoVivienda: Estado,
  anyos: Estado,

  siguiente: {
    estado: number,
    cb: Dispatch<React.SetStateAction<number>>
  }
}

interface Estados {
  titular: string,
  edad: string,
  ingresos: string,
  deudas: string,
  sabeCasa: string,
  precio: string,
  provincia: string,
  quiereCasa: string,
  uso: string,
  tipoVivienda: string,
  anyos: string,
  siguiente: number
}

interface Provincia {codigo:string, provincia: string}

async function verCSV() {
    let relPath = Buffer.from("src/app/public/", "ascii").toString("base64")
    let name = Buffer.from("codprov.csv", "ascii")
    
    let respuesta = await fetch(`http://localhost:5050/api/documents/localFile/${relPath}/${name}`)
    .then(response => response.json())
    .then(data => {
        let provincias : [] = data[0].split("\r\n")
        let arrayProvincias : Provincia[] = []
        provincias.forEach((provincia : string) => {
            let [codigo, nombre] = provincia.split(",")
            arrayProvincias.push({codigo: codigo.replaceAll("\"", ""), provincia: nombre.replaceAll("\"", "")})
        });

        return arrayProvincias

    })

    return respuesta
}

function validarDatos(states: Estados) : number {
    
  try {
      for(const [state, value] of Object.entries(states)) {
          
          if(states.sabeCasa === "Sí" && state === "quiereCasa") {
              continue
          }

          if(value === "") {
              throw new Error("Debe rellenar todos los campos")
          }
      }

      if(parseInt(states.edad) < 18 || parseInt(states.edad) > 66)
          throw new Error("La edad debe estar entre 18 y 66 años")
      
      if(parseInt(states.precio) < 20000 || parseInt(states.precio) > 1000000) 
          throw new Error("El precio de la casa debe ser mayor que 20.000€ y menor que 1.000.000€. Asegúrate que el número no esté separado por puntos o comas. Si está fuera de estos límites, pida una consulta.")
  
      if(parseInt(states.anyos) < 10 || parseInt(states.anyos) > 40) 
          throw new Error("El tiempo de la hipoteca debe estar entre 10 y 40 años. Si buca algo fuera de estos límites, pida una consulta.")

  } catch (error) {
      alert(error)
      return states.siguiente
  }
  return states.siguiente + 1
}

const Formulario = (props: Props) => {

  const estados = {
    titular: props.titular.estado,
    edad: props.edad.estado,
    ingresos: props.ingresos.estado,
    deudas: props.deudas.estado,
    sabeCasa: props.sabeCasa.estado,
    precio: props.precio.estado,
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
            let provincias = await verCSV()
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
                        <TextInputSim titulo={"¿Qué edad tienes?"} explicacion={"Debes tener entre 18 y 66 años"} tipo={"number"} placeholder={"Edad"} magnitud={""} valorDefault={props.edad.estado} valorDefaultCb={props.edad.cb} disabled={false} />
                        <TextInputSim titulo={"¿Cuáles son tus ingresos?"} explicacion={"Suma cuánto dinero neto ingresas en un mes"} tipo={"number"} placeholder={"Total"} magnitud={"€"} valorDefault={props.ingresos.estado} valorDefaultCb={props.ingresos.cb} disabled={false}  />
                    </div>
                    <div>
                    <TextInputSim titulo={"¿Tienes otros préstamos?"} explicacion={"En caso afirmativo, indica la suma de todas las cuotas mensuales. Ten en cuenta otros pagos tales como pensiones de manutención"} tipo={"number"} placeholder={"Total"} magnitud={"€"} valorDefault={props.deudas.estado} valorDefaultCb={props.deudas.cb} disabled={false}  />
                    </div>
                </div>
            </div>
    
            <hr />
            <div className="prestamo">
                <div>
                    <img src={iconoUser} alt="" />
                    <h2>Sobre tu préstamo</h2>
                </div>
                <div className={styles.datos}>
                    <div>
                        <RadioInputSim titulo={"¿Sabes cuál va a ser tu casa?"} opcion1={"Sí"} opcion2={"No"} estadoCb={props.sabeCasa.cb} estado={props.sabeCasa.estado} />
                        <TextInputSim titulo={"¿Cuánto cuesta?"} explicacion={"Entre 20.000 y 1.000.000€"} tipo={"number"} placeholder={"Total"} magnitud={"€"} valorDefault={props.precio.estado} valorDefaultCb={props.precio.cb} disabled={false}  />
                        <TextInputSim titulo={"¿Dónde está?"} explicacion={"Introduzca el código postal de su localidad"} tipo={"number"} placeholder={"Código postal"} magnitud={""} valorDefault={props.provincia.estado} valorDefaultCb={props.provincia.cb} disabled={false} />
                        <p style={{visibility: cpCorrecto ? "visible" : "hidden", textAlign: "center", fontWeight: "bold", fontSize: "1.25vw", marginTop: "1vh"}}>{provinciaCp}</p>

                    </div>
                    <div>
                        <RadioInputSim titulo={"¿Cuál va a ser el uso de la vivienda?"} opcion1={"Vivienda habitual"} opcion2={"Segunda residencia"} estadoCb={props.uso.cb} estado={props.uso.estado} />
                        <RadioInputSim titulo={"¿Qué tipo de vivienda es?"} opcion1={"Segunda mano"} opcion2={"Nueva construcción"} estadoCb={props.tipoVivienda.cb} estado={props.tipoVivienda.estado} />
                        <TextInputSim titulo={"¿Cuántos años necesitas?"} explicacion={"Entre 10 y 40 años"} tipo={"number"} placeholder={"Años"} magnitud={""} valorDefault={props.anyos.estado} valorDefaultCb={props.anyos.cb} disabled={false}  />
                    </div>
                </div>
            </div>
        </div>
    
        <button onClick={() => props.siguiente.cb(validarDatos(estados))}>CALCULAR</button>
    </div>
  )
}

export default Formulario