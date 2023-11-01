import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import styles from "../css/login.module.css"
import googleLogo from "../img/google_logo.svg"
import fbLogo from "../img/facebook_logo.svg"
import twitterLogo from "../img/twitter_logo.svg"
import appleLogo from "../img/apple_logo.svg"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UsuarioAPI from "../services/users";

const api = new UsuarioAPI()

function Login() {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    const [errText, setErrText] = useState("")

    useEffect(() => {
      
        if(url !== "") {
            navigate(url)
        }
    }, [url, navigate])
    
    return(
        <div>
            <Navbar />
            <div className={styles.login}>
                <div>
                    <h1>Iniciar sesión</h1>
                    <div className={styles.datos}>
                        <input type="text" placeholder="Correo electrónico" required onChange={e => setEmail(e.currentTarget.value)}/>
                        <input type="password" placeholder="Contraseña" required onChange={e => setPass(e.currentTarget.value)}/>

                        <div>
                            <input type="checkbox" name="checkbox" id={styles.checkbox} required/>
                            <label htmlFor={styles.checkbox}>Recuérdame</label>
                        </div>
                        <span className={styles.err}>{errText}</span>
                        <button onClick={async() => {await api.login(email, pass, setUrl, "email", setErrText)}}>ENVIAR</button>
                        <span><a className="link" href="/recuperarContraseña">¿Has olvidado tu contraseña?</a></span>
                        <p>Inicia sesión con</p>
                        <div className={styles.logins}>
                            <img src={googleLogo} alt="Inicia sesión con Google" onClick={async() => await api.login(email, pass, setUrl, "google", setErrText)}/>
                            <img src={fbLogo} alt="Inicia sesión con Facebook" onClick={async() => await api.login(email, pass, setUrl, "facebook", setErrText)}/>
                            <img src={appleLogo}  alt="Inicia sesión con Apple ID" onClick={async() => await api.login(email, pass, setUrl, "apple", setErrText)}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;