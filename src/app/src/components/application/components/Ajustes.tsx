import styles from "../../../css/application/Ajustes.module.css"
import placeholder from "../../../img/application/Placeholder_avatar.svg"
import CuentaVinculada from "./cuentaVinculada"

import logoGoogle from "../../../img/google_logo.svg"
import logoFacebook from "../../../img/facebook_logo.svg"
import logoTwitter from "../../../img/twitter_logo.svg"
import logoApple from "../../../img/apple_logo.svg"

interface Props {
    nombreCompleto: string,
    correo: string,
    imagen: string
}

function Ajustes(props:Props) {
    let imagen = props.imagen !== "" ? props.imagen : placeholder
    return(
        <div className={styles.ajustes}>
            <div className={styles.infoBasica}>
                <h2>Información básica</h2>
                <div className={styles.avatar}>
                    <p>Avatar</p>
                    <img src={imagen} alt="Avatar" />
                </div>
                <div className={styles.inputs}>
                    <p>Nombre completo</p>
                    <input type="text" name="Nombre" id="" value={props.nombreCompleto} disabled/>
                </div>
                <div className={styles.inputs}>
                    <p>Correo electrónico</p>
                    <input type="text" name="Nombre" id="" value={props.correo} disabled/>
                </div>

                <button className={styles.cerrarSesion}>Cerrar sesión</button>
            </div>

            <div className={styles.cuentas}>
                <div className={styles.vinculadas}>
                    <h2>Cuentas vinculadas</h2>
                    <CuentaVinculada nombre={"Google"} logo={logoGoogle} vinculada={true} />
                    <CuentaVinculada nombre={"Facebook"} logo={logoFacebook} vinculada={true} />
                </div>
                <div className={styles.sinVincular}>
                    <p>Inicia sesión con: </p>
                    <CuentaVinculada nombre={"Twitter"} logo={logoTwitter} vinculada={false} />
                    <CuentaVinculada nombre={"Apple ID"} logo={logoApple} vinculada={false} />
                </div>
            </div>
        </div>
    )
}

export default Ajustes