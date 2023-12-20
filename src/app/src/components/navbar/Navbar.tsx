import { useEffect, useState } from "react";
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false)

    return(
        <nav className={styles.navbar}>
            <a href="/"><img src={require("../../img/Logo.png")} alt="Logo AFH Kredit" /></a>
            <ul className={styles.enlaces}>
                <li><Link to={"/nosotros"}>Nosotros</Link></li>
                <li><Link to={"/simulador"}>Simula tu hipoteca</Link></li>
                <li><Link to={"/contacto"}>Contacto</Link></li>
                <li><Link to={"/blog"}>Blog</Link></li>
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
                <div className={open ? `${styles.burgerIcon} ${styles.openBurgerIcon}` : `${styles.burgerIcon} ${styles.closeBurgerIcon}`} onClick={() => setOpen(!open)}>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>

                <div className={open ? `${styles.burgerMenu} ${styles.openBurgerMenu}` : `${styles.burgerMenu} ${styles.closeBurgerMenu}`}>
                    <ul className={styles.enlaces}>
                        <li><a href="/nosotros">Nosotros</a></li>
                        <li><a href="/simulador">Simula tu hipoteca</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/login">Iniciar sesión</a></li>
                    </ul>
                </div>
        </nav>
    )
}

export default Navbar
