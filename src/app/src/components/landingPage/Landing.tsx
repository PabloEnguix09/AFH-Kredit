import styles from "./Landing.module.css";
import logoCompleto from "../../img/logo completo.svg";
import flechaAbajo from "../../img/dropdown_arrow_white.svg";

import fondoLanding from "../../img/fondoLanding.png"

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
        <div className={styles.landing} >
            <main className={styles.landingPage} style={{background: `url(${fondoLanding})`}}>
                <div className={styles.blur}></div>
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
                <FAQ pregunta="¿Qué hace un intermediario?" respuesta="Un intermediario se encarga de encontrar las mejores condiciones en el mercado hipotecario para tus necesidades y de acompañarte en todo el proceso."/>
                <FAQ pregunta="¿Qué características determinarán mi cuota?" respuesta="Las características que determinan la cuota son: el tipo de interés, el cual puede ir bonificado dependiendo de los productos que contrates; el plazo, con un límite de 30 años para las hipotecas a tipo fijo y 40 para las de tipo variable, y que la edad de los solicitantes más el plazo no supere los 75 años."/>
                <FAQ pregunta="¿Sois un banco?" respuesta="AFH Kredit no es un banco, somos intermediarios financieros. Nosotros nos dedicamos a hablar con los bancos por ti para proteger tus intereses y asegurar tus necesidades."/>
                <FAQ pregunta="¿Podéis conseguirme una hipoteca si mi banco me la ha denegado?" respuesta="Sí, podemos ayudarte a explorar opciones para obtener una hipoteca incluso si tu banco te la ha denegado. Nosotros trabajamos con una gran cantidad de opciones para mejorar tu elegibilidad y aumentar tus posibilidades de conseguir una hipoteca."/>
            </section>
        </div>
    )
}

export default Landing