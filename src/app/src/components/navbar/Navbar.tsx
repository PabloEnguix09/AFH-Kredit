import { useEffect, useState } from "react";
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";
import burger from "../../img/burger_menu.svg"

function Navbar() {
    const [ventana, setVentana] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        setVentana({
            height: window.innerHeight,
            width: window.innerWidth
        })
    }, [])
    
    return(
        <nav className={styles.navbar}>
            <a href="/"><img src={require("../../img/Logo.png")} alt="Logo AFH Kredit" /></a>
            <ul className={styles.enlaces}>
                <li><a href="/nosotros">Nosotros</a></li>
                <li><a href="/simulador">Simula tu hipoteca</a></li>
                <li><a href="/contacto">Contacto</a></li>
                <li><a href="/blog">Blog</a></li>
            </ul>
            <div>
                {/*<select name="" id="">
                    <option value="ES">ES</option>
                    <option value="VA">VA</option>
                    <option value="EN">EN</option>
                </select> */}
                <Link to={"/login"}>
                    <button className={styles.loginBtn}>Iniciar sesión</button>
                </Link>
                <img className={styles.burger} src={burger} alt="Menú móvil" />
            </div>
        </nav>
    )
}

export default Navbar
