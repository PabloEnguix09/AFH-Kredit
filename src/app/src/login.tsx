import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import styles from "./css/login.module.css"
import googleLogo from "./img/google_logo.svg"
import fbLogo from "./img/facebook_logo.svg"
import twitterLogo from "./img/twitter_logo.svg"
import appleLogo from "./img/apple_logo.svg"

function Login() {
    return(
        <div>
            <Navbar />
            <div className={styles.login}>
                <div>
                    <h1>Iniciar sesión</h1>
                    <div className={styles.datos}>
                        <input type="text" placeholder="Correo electrónico" required/>
                        <input type="password" placeholder="Contraseña" required/>

                        <div>
                            <input type="checkbox" name="checkbox" id={styles.checkbox} required/>
                            <label htmlFor="checkbox">Recuérdame</label>
                        </div>

                        <button>ENVIAR</button>
                        <span>¿Has olvidado tu contraseña? <a className="link" href="/recuperarContraseña">Click aquí</a></span>
                        <p>Inicia sesión con</p>
                        <div className={styles.logins}>
                            <img src={googleLogo} alt="Inicia sesión con Google" />
                            <img src={fbLogo} alt="Inicia sesión con Facebook" />
                            <img src={twitterLogo} alt="Inicia sesión con Twitter" />
                            <img src={appleLogo}  alt="Inicia sesión con Apple ID" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;