import { Dispatch, SetStateAction, useState } from "react"
import UserNavbar from "../components/application/user/UserNavbar"
import Chat from "../components/application/components/chat/Chat"
import DocumentosUser from "../components/application/components/documentos/DocumentosUser"
import Ajustes from "../components/application/components/Ajustes"
import SelectorPrestamo from "../components/application/components/amortizacion/SelectorPrestamo"

import styles from "../css/application/App.module.css"

function setPaginaUser(pagina:string, userData: Object, contactoSelected:string, setContactoSelected:Dispatch<SetStateAction<string>>) {
    switch (pagina) {
        case "Chat":
            return <Chat datos={userData} contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} />
        case "Documentos":
            return <DocumentosUser contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} />
        case "Amortizacion":
            return <SelectorPrestamo />
        case "Ajustes":
            return <Ajustes nombreCompleto={"Tremendo De User"} correo={"user@gmail.com"} imagen={""} />
    }
}

function UserApp() {
    const [userData, setUserData] = useState({})
    const [pagina, setPagina] = useState("Chat")
    const [contactoSelected, setContactoSelected] = useState("")

    return(
        <div className={styles.app}>
            <UserNavbar cambioPagina={pagina} setCambioPagina={setPagina} />
            {setPaginaUser(pagina, userData, contactoSelected, setContactoSelected)}
        </div>
    )
}

export default UserApp