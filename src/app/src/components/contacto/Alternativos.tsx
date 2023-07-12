import styles from "./FormularioContacto.module.css"

import iconoCorreo from "../../img/correo.svg"
import iconoWhatsapp from "../../img/whatsapp.svg"

import tiktokLogo from "../../img/tiktok.svg"
import instagramLogo from "../../img/instagram.svg"
import twitterLogo from "../../img/twitter.svg"
import facebookLogo from "../../img/facebook.svg"
import { Link } from "react-router-dom"

function Alternativos() {
    return(
        <div className={styles.alternativos}>
            <h2>Contáctanos también por</h2>
            <div className={styles.alternativo}>
                <img src={iconoCorreo} alt="Correo" />
                <a href="mailto:info@grupoafh.com">info@grupoafh.com</a>
            </div>
            <div className={styles.alternativo}>
                <img src={iconoWhatsapp} alt="WhatsApp" />
                <a href="https://api.whatsapp.com/send?phone=34666666666">+34 666 66 66 66</a>
            </div>
            <div className={styles.linea}>
                <hr />
                <span>o</span>
                <hr />
            </div>
            <h2>También puedes seguirnos en redes</h2>
            <div className={styles.redes}>
                <Link to={"https://www.tiktok.com"}>
                    <img src={tiktokLogo} alt="Logo TikTok" />
                </Link>
                <Link to={"https://www.instagram.com/"}>
                    <img src={instagramLogo} alt="Logo Instagram" />
                </Link>
                <Link to={"https://twitter.com"}>
                    <img src={twitterLogo} alt="Logo Twitter" />
                </Link>
                <Link to={"https://es-es.facebook.com/"}>
                    <img src={facebookLogo} alt="Logo Facebook" />
                </Link>
            </div>
        </div>
    )
}

export default Alternativos