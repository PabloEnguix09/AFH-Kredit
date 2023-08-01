import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import styles from "./css/login.module.css"
import googleLogo from "./img/google_logo.svg"
import fbLogo from "./img/facebook_logo.svg"
import twitterLogo from "./img/twitter_logo.svg"
import appleLogo from "./img/apple_logo.svg"
import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";


async function log(email: string, password: string, setUrl: Dispatch<React.SetStateAction<string>>) {
    
    //let pass = cryptr.encrypt(password)
    let pass = CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET_KEY as string).toString()
    
    
    let body : BodyInit = JSON.stringify({
        email:email, 
        password: pass
    })
    
    await fetch("http://localhost:5050/api/login", {
        method: "POST", 
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: body
    }).then((response) => {
        if(response.status === 200) {
            
            setUrl(response.url)
        }
    })
    
    
}

function Login() {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
      
        if(url !== "") {
            navigate("../"+url.split("3000/")[1])
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
                            <label htmlFor="checkbox">Recuérdame</label>
                        </div>

                        <button onClick={async() => {await log(email, pass, setUrl)}}>ENVIAR</button>
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