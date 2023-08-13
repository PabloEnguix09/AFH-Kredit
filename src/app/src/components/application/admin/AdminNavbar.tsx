import styles from "../../../css/application/AppNavbar.module.css";

import messenger from "../../../img/application/messenger.svg"
import docs from "../../../img/application/docs.svg"
import db from "../../../img/application/db.svg"
import blog from "../../../img/application/blog.svg"
import settings from "../../../img/application/settings.svg"
import { Dispatch, useEffect, useState } from "react";

interface Props {
    cambioPagina:string,
    setCambioPagina: Dispatch<React.SetStateAction<string>>,
}
function AdminNavbar({cambioPagina, setCambioPagina}:Props) {

    const [hasEstado, setHasEstado] = useState(true)

    useEffect(() => {
      switch(cambioPagina){
        case "Chat":
        case "Documentos":
            setHasEstado(true)
            break;
        case "BD":
        case "Blog":
        case "Ajustes":
            setHasEstado(false)
            break;
        default:
            break;
      }
    }, [cambioPagina])
    

    return(
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <div className={cambioPagina === "Chat" ? styles.selected : ""} onClick={() => setCambioPagina("Chat")}>
                        <img src={messenger} alt="Icono chat" />
                        <span>Chat</span>
                    </div>
                </li>
                <li>
                    <div className={cambioPagina === "Documentos" ? styles.selected : ""} onClick={() => setCambioPagina("Documentos")}>
                        <img src={docs} alt="Icono documentos" />
                        <span>Documentos</span>
                    </div>
                </li>
                <li>
                    <div className={cambioPagina === "BD" ? styles.selected : ""} onClick={() => setCambioPagina("BD")}>
                        <img src={db} alt="Icono bd" />
                        <span>Base de datos</span>
                    </div>
                </li>
                <li>
                    <div className={cambioPagina === "Blog" ? styles.selected : ""} onClick={() => setCambioPagina("Blog")}>
                        <img src={blog} alt="Icono blog" />
                        <span>Blog</span>
                    </div>
                </li>
                <li>
                    <div className={cambioPagina === "Ajustes" ? styles.selected : ""} onClick={() => setCambioPagina("Ajustes")}>
                        <img src={settings} alt="Icono ajustes" />
                        <span>Ajustes</span>
                    </div>
                </li>
            </ul>
            {hasEstado ? <p><strong>Estado: </strong> xd</p> : <></>}
            
        </nav>
    )
}

export default AdminNavbar