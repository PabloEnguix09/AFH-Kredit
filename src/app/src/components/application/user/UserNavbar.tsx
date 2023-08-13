import { Dispatch, useEffect, useState } from "react";
import styles from "../../../css/application/AppNavbar.module.css";

import messenger from "../../../img/application/messenger.svg"
import docs from "../../../img/application/docs.svg"
import checklist from "../../../img/application/checklist.svg"
import settings from "../../../img/application/settings.svg"

interface Props {
    cambioPagina:string,
    setCambioPagina: Dispatch<React.SetStateAction<string>>,
}

function UserNavbar({cambioPagina, setCambioPagina}:Props) {

    const [hasEstado, setHasEstado] = useState(true)

    useEffect(() => {
      switch(cambioPagina){
        case "Chat":
        case "Documentos":
        case "Amortizacion":
            setHasEstado(true)
            break;
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
                    <div className={cambioPagina === "Amortizacion" ? styles.selected : ""} onClick={() => setCambioPagina("Amortizacion")}>
                        <img src={checklist} alt="Icono amortización" />
                        <span>Amortización</span>
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

export default UserNavbar