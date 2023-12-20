import React from "react";
import logoCompleto from "../../img/logo completo.svg"
import styles from "./Footer.module.css"

import tiktokLogo from "../../img/tiktok.svg"
import instagramLogo from "../../img/instagram.svg"
import twitterLogo from "../../img/twitter.svg"
import facebookLogo from "../../img/facebook.svg"

import afinhome from "../../img/Logo_AFHHome.png"
import grupoafh from "../../img/grupoAFH.svg"
import { Link } from "react-router-dom";

function Footer() {
    return(
        <footer className={styles.footer}>
            <div className={styles.foot}>
                <div className={styles.enlaces}>
                    <a href="/">
                        <img src={logoCompleto} alt="Logo completo AFH Kredit" />
                    </a>
                    <div>
                        <Link to={"/contacto"}>Contacto</Link>
                        <Link to={"/nosotros"}>Nosotros</Link>
                        <Link to={"/privacidad"}>Privacidad</Link>
                        <Link to={"/blog"}>Blog</Link>
                    </div>
                </div>
                <hr />
                <div className={styles.copyRedes}>
                    <p className={styles.copy}>Iconos hechos por <a href="https://www.flaticon.es/autores/freepik">Freepik</a></p>
                    <p className={styles.copy}>Copyright 2023 © AFH Kredit. Todos los derechos reservados</p>
                    <div className={styles.redes}>
                        <Link to={"https://www.instagram.com/"}>
                            <img src={instagramLogo} alt="Logo Instagram" />
                        </Link>
                        <Link to={"https://es-es.facebook.com/"}>
                            <img src={facebookLogo} alt="Logo Facebook" />
                        </Link>
                        <Link to={"https://www.tiktok.com"}>
                            <img src={tiktokLogo} alt="Logo TikTok" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.grupoEmpresas}>
                <div className={styles.empresas}>
                    <img src={afinhome} alt="Logo AFinHome" />
                    <img src={logoCompleto} alt="Logo completo AFH Kredit" />
                </div>
                <img src={grupoafh} alt="Grupo AFH" />
            </div>
        </footer>
    )
}
export default Footer