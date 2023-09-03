import { Dispatch, SetStateAction, useEffect, useState } from "react"
import UserNavbar from "../components/application/user/UserNavbar"
import Chat from "../components/application/components/chat/Chat"
import DocumentosUser from "../components/application/components/documentos/DocumentosUser"
import Ajustes from "../components/application/components/Ajustes"
import SelectorPrestamo from "../components/application/components/amortizacion/SelectorPrestamo"

import styles from "../css/application/App.module.css"
import { auth } from "../js/firebaseApp"
import { User, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import UsuarioAPI from "../services/users"
import { IContactoDatos, IConversacionInterfaz } from "../types/app.types"

const api = new UsuarioAPI()

function setPaginaUser(pagina:string, userData: User | null, contactos: IContactoDatos[], conversaciones: IConversacionInterfaz[], contactoSelected:string, setContactoSelected:Dispatch<SetStateAction<string>>) {
    if(userData !== null && contactos.length !== 0)
        switch (pagina) {
            case "Chat":
                return <Chat datos={userData} contactos={contactos} contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} conversaciones={conversaciones} />
            case "Documentos":
                return <DocumentosUser datos={userData} />
            case "Amortizacion":
                return <SelectorPrestamo userData={userData} />
            case "Ajustes":
                return <Ajustes nombreCompleto={userData.displayName!} correo={userData.email!} imagen={userData.photoURL} usuario={userData} />
        }
}

function UserApp() {
    const [userData, setUserData] = useState<User | null>(null)

    const [pagina, setPagina] = useState("Chat")

    const [contactoSelected, setContactoSelected] = useState("")
    const [contactos, setContactos] = useState<IContactoDatos[]>([])

    const [conversaciones, setConversaciones] = useState<IConversacionInterfaz[]>([])

    let navigate = useNavigate()

    useEffect(() => {
        const getUserData = async(user : User) => {
            let uid = user.email
            if(uid) {
                await api.getContctos(uid, setContactos, setConversaciones)
            }
        }
        let contador = 0
        onAuthStateChanged(auth, (user) => {
            if(user && userData === null && contador < 5) {
                contador++
                setUserData(user)
                getUserData(user)
            }
            else if(!user || contador >= 5){
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
            <UserNavbar cambioPagina={pagina} setCambioPagina={setPagina} />
            {setPaginaUser(pagina, userData, contactos, conversaciones, contactoSelected, setContactoSelected)}
        </div>
    )
}

export default UserApp