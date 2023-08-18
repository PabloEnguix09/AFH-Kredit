import Chat from "../components/application/components/chat/Chat"
import AdminNavbar from "../components/application/admin/AdminNavbar"
import Cookies from "js-cookie"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Documentos from "../components/application/components/documentos/Documentos"
import BaseDatos from "../components/application/components/baseDatos/BaseDatos"
import Blog from "../components/application/components/blog/Blog"
import Ajustes from "../components/application/components/Ajustes"

import styles from "../css/application/App.module.css"


function setPaginaAdmin(pagina:string, userData: Object, contactoSelected:string, setContactoSelected:Dispatch<SetStateAction<string>>) {
    switch (pagina) {
        case "Chat":
            return <Chat datos={userData} contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} />
        case "Documentos":
            return <Documentos contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} />
        case "BD":
            return <BaseDatos />
        case "Blog":
            return <Blog />
        case "Ajustes":
            return <Ajustes nombreCompleto={"Tremendo De Admin"} correo={"admin@afhkredit.com"} imagen={""} />
    }
}

function AdminApp() {

    const [userData, setUserData] = useState({})

    const [pagina, setPagina] = useState("Chat")

    const [contactoSelected, setContactoSelected] = useState("")

    return(
        <div className={styles.app}>
            <AdminNavbar cambioPagina={pagina} setCambioPagina={setPagina} />
            {setPaginaAdmin(pagina, userData, contactoSelected, setContactoSelected)}
        </div>
    )
}

export default AdminApp