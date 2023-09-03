import styles from "../../../css/application/Ajustes.module.css"
import placeholder from "../../../img/application/Placeholder_avatar.svg"
import CuentaVinculada from "./cuentaVinculada"

import logoGoogle from "../../../img/google_logo.svg"
import logoFacebook from "../../../img/facebook_logo.svg"
import logoTwitter from "../../../img/twitter_logo.svg"
import logoApple from "../../../img/apple_logo.svg"
import { User, sendPasswordResetEmail, signOut, updateProfile } from "firebase/auth"
import { auth, storage } from "../../../js/firebaseApp"
import { ChangeEvent, useRef, useState } from "react"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

interface Props {
    nombreCompleto: string,
    correo: string,
    imagen: string | null,
    usuario: User
}

function Ajustes(props:Props) {

    const [imagen, setImagen] = useState(props.imagen !== null ? props.imagen : placeholder)

    const input = useRef<HTMLInputElement>(null)
    const clickDiv = () => {
        if(input.current !== null) {
            input.current.click()
        }
    }

    const subirArchivo = async(e: ChangeEvent<HTMLInputElement>, email: string) => {
        if(e.target.files !== null) {
            let archivo = e.target.files[0]
            let blob = archivo.slice(0, archivo.size, "image/png")
            let file = new File([blob], email)
            const storageRef = ref(storage, `/fotosPerfil/${file.name}`)

            await uploadBytesResumable(storageRef, archivo).then((snapshot) => {
                getDownloadURL(storageRef).then((url) => {
                    setImagen(url)
                    
                    updateProfile(props.usuario, {photoURL: url})
                })
            })

        }
    }

    return(
        <div className={styles.ajustes}>
            <div className={styles.infoBasica}>
                <h2>Información básica</h2>
                <div className={styles.avatar}>
                    <p>Avatar</p>
                    <img src={imagen} alt="Avatar" onClick={clickDiv}/>
                    <input type="file" id="subirArchivo" style={{display: "none"}} ref={input} onChange={async(e) => await subirArchivo(e, props.correo)}/>
                </div>
                <div className={styles.inputs}>
                    <p>Nombre completo</p>
                    <input type="text" name="Nombre" id="" value={props.nombreCompleto} disabled/>
                </div>
                <div className={styles.inputs}>
                    <p>Correo electrónico</p>
                    <input type="text" name="Nombre" id="" value={props.correo} disabled/>
                </div>

                <div className={styles.inputs}>
                    <button className={styles.cerrarSesion} onClick={async() => await signOut(auth)}>Cerrar sesión</button>
                    <button className={styles.cerrarSesion} onClick={async() => await sendPasswordResetEmail(auth, props.correo).then(() => alert("Revise su correo electrónico"))}>Cambiar contraseña</button>
                </div>
                </div>

            <div className={styles.cuentas}>
                <div className={styles.vinculadas}>
                    <h2>Cuentas vinculadas</h2>
                    <CuentaVinculada nombre={"Google"} logo={logoGoogle} vinculada={true} />
                </div>
                <div className={styles.sinVincular}>
                    <p>Inicia sesión con: </p>
                    <CuentaVinculada nombre={"Facebook"} logo={logoFacebook} vinculada={false} />
                    <CuentaVinculada nombre={"Twitter"} logo={logoTwitter} vinculada={false} />
                    <CuentaVinculada nombre={"Apple ID"} logo={logoApple} vinculada={false} />
                </div>
            </div>
        </div>
    )
}

export default Ajustes