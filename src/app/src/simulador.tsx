import RadioInputSim from "./components/simulador/RadioInputSim"
import Empezamos from "./components/footer/Empezamos"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import styles from "./css/simulador.module.css"

import iconoUser from "./img/User.svg"
import TextInputSim from "./components/simulador/TextInputSim"

function Simulador() {

    return(
        <div>
            <Navbar />
            <h1>Simula tu hipoteca</h1>

            <div className={styles.simulador}>
                <div className={styles.formulario}>
                    <div className={styles.datosPersonales}>
                        <div>
                            <img src={iconoUser} alt="" />
                            <h2>Datos personales</h2>
                        </div>
                        <div className={styles.datos}>
                            <div>
                                <RadioInputSim titulo={"¿Cuántos titulares va a tener la hipoteca?"} opcion1={"Uno"} opcion2={"Más de uno"} />
                                <TextInputSim titulo={"¿Qué edad tienes?"} explicacion={"Debes tener entre 18 y 66 años"} tipo={"number"} placeholder={"Edad"} magnitud={""} />
                                <TextInputSim titulo={"¿Cuáles son tus ingresos?"} explicacion={"Suma cuánto dinero neto ingresas en un mes"} tipo={"number"} placeholder={"Total"} magnitud={"€"} />
                            </div>
                            <TextInputSim titulo={"¿Tienes otros préstamos?"} explicacion={"En caso afirmativo, indica la suma de todas las cuotas mensuales. Ten en cuenta otros pagos tales como pensiones de manutención"} tipo={"number"} placeholder={"Total"} magnitud={"€"} />
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
                                <RadioInputSim titulo={"¿Sabes cuál va a ser tu casa?"} opcion1={"Sí"} opcion2={"No"} />
                                <TextInputSim titulo={"¿Cuánto cuesta?"} explicacion={"Entre XX.XXX y XXX.XXX€"} tipo={"number"} placeholder={"Total"} magnitud={"€"} />
                                <TextInputSim titulo={"¿Dónde está?"} explicacion={""} tipo={"text"} placeholder={"Provincia"} magnitud={""} />
                            </div>
                            <div>
                                <RadioInputSim titulo={"¿Cuál va a ser el uso de la vivienda?"} opcion1={"Vivienda habitual"} opcion2={"Segunda residencia"} />
                                <RadioInputSim titulo={"¿Qué tipo de vivienda es?"} opcion1={"Segunda mano"} opcion2={"Nueva construcción"} />
                                <TextInputSim titulo={"¿Cuántos años necesitas?"} explicacion={"Entre 10 y 40 años"} tipo={"number"} placeholder={"Años"} magnitud={""} />
                            </div>
                        </div>
                    </div>
                </div>

                <button>CALCULAR</button>
                
            </div>
            <Empezamos />
            <Footer />
        </div>
    )
}

export default Simulador