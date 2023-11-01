
import Empezamos from "../components/footer/Empezamos"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import styles from "../css/nosotros.module.css"

function Nosotros() {
    return(
        <div>
            <Navbar />
            <div className={styles.nosotros}>
                <h1>Sobre nosotros</h1>
                <p>
                    Bienvenido a <strong>AFH Kredit</strong>, empresa de confianza con años de experiencia en el sector hipotecario. Estamos aquí para hacer realidad el sueño de tener tu
                    hogar, brindándote soluciones de financiación a medida y asesoramiento experto en hipotecas.
                </p>
                <br />
                <p>
                    En AFH Kredit comprendemos que comprar una vivienda es una de las decisiones financieras más importantes que tomarás en tu vida. Nuestro equipo de <strong>expertos 
                    en hipotecas</strong> está comprometido en ayudarte a navegar por el proceso de manera fluida y sin complicaciones.
                </p>
                <br />
                <p>
                    Nuestra misión es simple: hacer que el proceso hipotecario sea <strong>lo más sencillo y sin estrés posible</strong> para ti. Sabemos que cada cliente es único, por lo que 
                    trabajamos mano a mano contigo para entender tus necesidades y encontrar la solución hipotecaria que mejor se adapte a tu situación.
                </p>

                <h2 style={{textAlign: "center", marginTop: "1rem"}}>Por qué elegirnos:</h2>
                <ol type="1">
                    <li>
                        <p>
                            <strong>Experiencia y Conocimiento</strong>: Nuestro equipo de especialistas en hipotecas cuenta con una amplia experiencia en el sector. Estamos actualizados con las 
                            últimas tendencias y regulaciones, lo que nos permite ofrecerte el asesoramiento más actualizado.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Asesoramiento Personalizado</strong>: Entendemos que las hipotecas no son un enfoque único para todos. Te brindamos asesoramiento personalizado, analizando tus metas 
                            y circunstancias para ofrecerte las mejores opciones de financiación.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Proceso Transparente</strong>: Queremos que te sientas seguro en cada paso del proceso. Te mantendremos informado y te explicaremos cada detalle para que tomes 
                            la decisión correcta.

                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Amplia Gama de Opciones</strong>: Trabajamos con una gran variedad de entidades financieras. Esto significa que podemos ayudarte a explorar una amplia gama de 
                            opciones y encontrar la que mejor se adapte a ti.
                        </p>
                    </li>
                    <li>
                        <p>
                            <strong>Compromiso Duradero</strong>: No solo estamos aquí para ayudarte a obtener tu primera hipoteca, sino que también estamos comprometidos a ser tu socio a largo plazo en 
                            todas tus necesidades hipotecarias.
                        </p>
                    </li>
                </ol>

                <p>
                    En AFH Kredit sabemos que tu casa es tu inversión más valiosa. Permítenos ser parte de este emocionante viaje hacia tu hogar. Estamos aquí para brindarte el apoyo y 
                    la orientación que necesitas en cada paso del camino.
                </p>

                <h3>
                    Adelante, estamos contigo.
                </h3>
            </div>
            <Empezamos />
            <Footer />
        </div>
    )
  }
  
  export default Nosotros