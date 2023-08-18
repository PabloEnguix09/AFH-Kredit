import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"
import styles from "../css/login.module.css"
import stylesRec from "../css/recuperar.module.css"


function RecuperarPass() {
    return(
        <div>
            <Navbar />
            <div className={styles.login}>
                <div className={stylesRec.recuperar}>
                    <h1>Recuperar contraseña</h1>
                    <div className={`${styles.datos} ${stylesRec.datos}`}>
                        <input type="text" placeholder="Correo electrónico" required/>
                    </div>
                    <button className={stylesRec.boton}>ENVIAR</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RecuperarPass