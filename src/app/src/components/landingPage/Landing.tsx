import styles from "./Landing.module.css";
import logoCompleto from "../../img/logo completo.svg";
import flechaAbajo from "../../img/dropdown_arrow_white.svg";

import Cosa from "./CosaQueNecesitas";
import cosaFacilidad from "../../img/cosa-facilidad.svg";
import cosaCercania from "../../img/cosa-cercania.svg";
import cosaOnline from "../../img/cosa-online.svg";

import Paso from "./PasoHipoteca";
import FAQ from "./preguntaFrecuente";
import { Link } from "react-router-dom";

function Landing() {

    const scrollToPasos = () => {
        
        const pasosHipoteca = document.getElementsByTagName("section")[1]
        const navbar = document.querySelector("nav")
        
        if(pasosHipoteca && navbar) {
            window.scrollTo({
                behavior:"smooth",
                top: 
                    pasosHipoteca.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    navbar.getBoundingClientRect().bottom,
            })
        }
    }

    return (
        <div className={styles.landing}>
            <main className={styles.landingPage}>
                <article className={styles.promo}>
                    <img src={logoCompleto} alt="Logo AFH Kredit con nombre de empresa" />
                    <p>Tu hipoteca más fácil que nunca</p>
                    <Link to={"/simulador"}>
                        <button className={styles.cta}>Calcula tu hipoteca</button>
                    </Link> 
                </article>

                <img className={styles.flechaAbajo} src={flechaAbajo} alt="Flecha abajo" onClick={scrollToPasos}/>
            </main>

            <section className={styles.loQueNecesitas}>
                <h1>Tenemos lo que necesitas</h1>
                <div className={styles.cosasQueNecesitas}>
                    <Cosa nombre="Facilidad" img={<img src={cosaFacilidad} alt="Icono facilidad"></img>} texto="Tu hipoteca nunca había sido más sencilla de hacer" />
                    <Cosa nombre="Cercanía" img={<img src={cosaCercania} alt="Icono facilidad"></img>} texto="Tu gestor te acompañará durante todo el proceso" />
                    <Cosa nombre="100% Online" img={<img src={cosaOnline} alt="Icono facilidad"></img>} texto="Puedes arreglar tu hipoteca sin salir de casa" />
                </div>
            </section>

            <section className={styles.pasosHipoteca}>
                <h1>Pasos para conseguir tu hipoteca</h1>
                <div className={styles.pasos}>
                    <Paso numero= "1" titulo="Contacto" texto="Nos ponemos en contacto y acordamos fecha y hora para una reunión"/>
                    <Paso numero= "2" titulo="Reunión" texto="Nos reunimos el día acordado y hablamos de tu hipoteca"/>
                    <Paso numero= "3" titulo="Trabajo" texto="Cuando tenemos claro todo lo de tu hipoteca, preparamos tus opciones"/>
                    <Paso numero= "4" titulo="Propuestas" texto="Te mostraremos todas las formas que tienes para hacer tu hipoteca"/>
                    <Paso numero= "5" titulo="Decisión" texto="Te ayudaremos a elegir la mejor opción en relación a tus necesidades"/>
                    <Paso numero= "6" titulo="Tramitación" texto="Rellenaremos todos los documentos para que solo tengas que firmar"/>
                </div>
            </section>

            <section className={styles.faqs}>
                <h1>Preguntas frecuentes</h1>
                <FAQ pregunta="pregunta" respuesta="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, cupiditate? Delectus maxime mollitia ea fuga magnam vel neque sequi totam, vero rerum. Nemo, inventore illum eveniet accusantium alias quas dolore!"/>
                <FAQ pregunta="pregunta" respuesta="respuesta generica"/>
                <FAQ pregunta="pregunta" respuesta="respuesta generica"/>
                <FAQ pregunta="pregunta" respuesta="respuesta generica"/>
            </section>
        </div>
    )
}

export default Landing