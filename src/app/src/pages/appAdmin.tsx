import Chat from "../components/application/components/chat/Chat"
import AdminNavbar from "../components/application/admin/AdminNavbar"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Documentos from "../components/application/components/documentos/Documentos"
import BaseDatos from "../components/application/components/baseDatos/BaseDatos"
import Blog from "../components/application/components/blog/Blog"
import Ajustes from "../components/application/components/Ajustes"

import styles from "../css/application/App.module.css"
import { auth} from "../js/firebaseApp"
import { User, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import UsuarioAPI from "../services/users"
import { IContactoDatos, IConversacionInterfaz } from "../types/app.types"
import Cookies from "js-cookie";

const api = new UsuarioAPI()

function setPaginaAdmin(pagina:string, userData: User | null, contactos: IContactoDatos[], conversaciones: IConversacionInterfaz[], contactoSelected:string, setContactoSelected:Dispatch<SetStateAction<string>>) {
    if(userData !== null && contactos.length !== 0) {
        switch (pagina) {
            case "Chat":
                return <Chat datos={userData} contactos={contactos} conversaciones={conversaciones} contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} />
            case "Documentos":
                return <Documentos contactos={contactos} contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} />
            case "BD":
                return <BaseDatos setContactoSelected={setContactoSelected} />
            case "Blog":
                return <Blog />
            case "Ajustes":
                return <Ajustes nombreCompleto={userData.displayName!} correo={userData.email!} imagen={userData.photoURL} usuario={userData} />
        }
    }
        
}

function AdminApp() {

    const [userData, setUserData] = useState<User | null>(null)

    const [pagina, setPagina] = useState("Chat")

    const [contactos, setContactos] = useState<IContactoDatos[]>([])
    const [conversaciones, setConversaciones] = useState<IConversacionInterfaz[]>([])


    const [contactoSelected, setContactoSelected] = useState("")
    let navigate = useNavigate()

    useEffect(() => {
        const getUserData = async(user : User) => {
            let uid = user.email
            if(uid) {
                await api.getContactos(uid, setContactos, setConversaciones)
            }
        }
        let contador = 0
        onAuthStateChanged(auth, (user) => {
            if(user && userData === null && contador < 5) {
                contador++
                setUserData(user)
                getUserData(user)
            }
            else if(!user || contador >= 5 || Cookies.get("rol") !== "Admin"){
                if (contador >= 5) {
                    console.log("llama demasiado aqui");
                }
                
                contador = 0
                navigate("/login")
            }
        })
    })
    

    return(
        <div className={styles.app}>
            <AdminNavbar cambioPagina={pagina} setCambioPagina={setPagina} />
            {setPaginaAdmin(pagina, userData, contactos, conversaciones, contactoSelected, setContactoSelected)}
        </div>
    )
}

export default AdminApp