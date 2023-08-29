import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import styles from "../css/login.module.css"
import googleLogo from "../img/google_logo.svg"
import fbLogo from "../img/facebook_logo.svg"
import twitterLogo from "../img/twitter_logo.svg"
import appleLogo from "../img/apple_logo.svg"
import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie"
import { GithubAuthProvider, UserCredential, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, fbProvider, googleProvider, twitterProvider } from "../js/firebaseApp";
import { getDoc, doc } from "firebase/firestore";

async function redirect(setUrl: Dispatch<React.SetStateAction<string>>, credentials: UserCredential) {
    
    if(credentials.user) {
        let userRef = doc(db, "usuarios", credentials.user.email!)
        await getDoc(userRef).then(async(res) => {

            Cookies.set("uid", await credentials.user.getIdToken())
    
            setUrl(res.data()!.rol === "Admin" ? "../app/admin" : "../app/user")
        })
        
    }
    else {
        alert("Usuario no encontrado. Inténtelo de nuevo")
    }
}

async function login(email: string, password: string, setUrl: Dispatch<React.SetStateAction<string>>, method:string, setErrText:Dispatch<React.SetStateAction<string>>) {
    
    setErrText("")
    setPersistence(auth, browserSessionPersistence).then(() => {
        switch(method) {
            case "email":
                return signInWithEmailAndPassword(auth, email, password).then(async(credentials) => {
                    await redirect(setUrl, credentials)
                }).catch(error => {                    
                    if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                        setErrText("El usuario o la contraseña son incorrectos, por favor, inténtelo de nuevo")
                    }
                    else {
                        console.log(error);
                        
                        setErrText("Ha habido un problema al iniciar sesión. Inténtelo de nuevo más tarde")
                    }
                })
            case "google":
                return signInWithPopup(auth, googleProvider).then(async(credentials) => {
                    await redirect(setUrl, credentials)
                }).catch(error => {
                    if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                        setErrText("El usuario o la contraseña son incorrectos, por favor, inténtelo de nuevo")
                    }
                    else {
                        setErrText("Ha habido un problema al iniciar sesión. Inténtelo de nuevo más tarde")
                        setErrText(error.code)
    
                    }
                })
            case "facebook":
                return signInWithPopup(auth, fbProvider).then(async(credentials) => {
                    await redirect(setUrl, credentials)
                }).catch(error => {
                    if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                        setErrText("El usuario o la contraseña son incorrectos, por favor, inténtelo de nuevo")
                    }
                    else {
                        setErrText("Ha habido un problema al iniciar sesión. Inténtelo de nuevo más tarde")
                    }
                })
            case "twitter":
                return signInWithPopup(auth, twitterProvider).then(async(credentials) => {
                    await redirect(setUrl, credentials)
                }).catch(error => {
                    if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                        setErrText("El usuario o la contraseña son incorrectos, por favor, inténtelo de nuevo")
                    }
                    else {
                        setErrText("Ha habido un problema al iniciar sesión. Inténtelo de nuevo más tarde")
                    }
                })    
            case "apple":
                //TODO: Provider apple
                return signInWithPopup(auth, new GithubAuthProvider()).then(async(credentials) => {
                    await redirect(setUrl, credentials)
                }).catch(error => {
                    if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                        setErrText("El usuario o la contraseña son incorrectos, por favor, inténtelo de nuevo")
                    }
                    else {
                        setErrText("Ha habido un problema al iniciar sesión. Inténtelo de nuevo más tarde")
                    }
                })
            default:
                return
        }
    }).catch(error => {
        console.log(error);
        
    })
    
    
}

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
                            <label htmlFor="checkbox">Recuérdame</label>
                        </div>
                        <span className={styles.err}>{errText}</span>
                        <button onClick={async() => {await login(email, pass, setUrl, "email", setErrText)}}>ENVIAR</button>
                        <span>¿Has olvidado tu contraseña? <a className="link" href="/recuperarContraseña">Click aquí</a></span>
                        <p>Inicia sesión con</p>
                        <div className={styles.logins}>
                            <img src={googleLogo} alt="Inicia sesión con Google" onClick={async() => await login(email, pass, setUrl, "google", setErrText)}/>
                            <img src={fbLogo} alt="Inicia sesión con Facebook" onClick={async() => await login(email, pass, setUrl, "facebook", setErrText)}/>
                            <img src={twitterLogo} alt="Inicia sesión con Twitter" onClick={async() => await login(email, pass, setUrl, "twitter", setErrText)}/>
                            <img src={appleLogo}  alt="Inicia sesión con Apple ID" onClick={async() => await login(email, pass, setUrl, "apple", setErrText)}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;