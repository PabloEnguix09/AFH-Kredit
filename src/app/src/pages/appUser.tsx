import { Dispatch, SetStateAction, useEffect, useState } from "react"
import UserNavbar from "../components/application/user/UserNavbar"
import Chat from "../components/application/components/chat/Chat"
import DocumentosUser from "../components/application/components/documentos/DocumentosUser"
import Ajustes from "../components/application/components/Ajustes"
import SelectorPrestamo from "../components/application/components/amortizacion/SelectorPrestamo"

import styles from "../css/application/App.module.css"
import { auth, db } from "../js/firebaseApp"
import { DocumentData, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { User, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"

interface ContactoDatos {
    displayName : string,
    uid: string,
    key: string,
    conversacionUID: string
}

interface ConversacionInterfaz {
    uid: string,
    mensajes: DocumentData
}

function setPaginaUser(pagina:string, userData: User | null, contactos: ContactoDatos[], conversaciones:ConversacionInterfaz[], contactoSelected:string, setContactoSelected:Dispatch<SetStateAction<string>>) {
    if(userData !== null && contactos.length !== 0)
        switch (pagina) {
            case "Chat":
                return <Chat datos={userData} contactos={contactos} contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} conversaciones={conversaciones} />
            case "Documentos":
                return <DocumentosUser datos={userData} />
            case "Amortizacion":
                return <SelectorPrestamo userData={userData} />
            case "Ajustes":
                return <Ajustes nombreCompleto={userData.displayName!} correo={userData.email!} imagen={""} />
        }
}

function UserApp() {
    const [userData, setUserData] = useState<User | null>(null)
    const [pagina, setPagina] = useState("Chat")
    const [contactoSelected, setContactoSelected] = useState("")
    const [contactos, setContactos] = useState<ContactoDatos[]>([])
    const [conversaciones, setConversaciones] = useState<ConversacionInterfaz[]>([])

    let navigate = useNavigate()

    useEffect(() => {
        const getUserData = async(user : User) => {
            let uid = user.email            

            await getDocs(query(collection(db, "usuarios"), where("email", "==", uid))).then(async(res) => {
                let user = res.docs[0].data()
                let contactos : ContactoDatos[] = []
                let conversaciones : ConversacionInterfaz[] = []
                for (let i = 0; i < user.contactos.length; i++) {
                    await getDocs(query(collection(db, "usuarios"), where("email", "==", user.contactos[i]))).then(async(res) => {
                        let contacto = res.docs[0].data()
                        let key = contacto.rol === "Admin" ? contacto.email + "-"+uid : uid + "-" + contacto.email
                        await getDoc(doc(db, "chats", key)).then((res) => {
                            if(res.exists()) {
                                contactos.push({displayName: contacto.nombre + " " + contacto.apellidos, uid: contacto.email, key:key, conversacionUID: res.id})
                                conversaciones.push({uid: res.id, mensajes: res.data()}) 

                                if(user.contactos.length === contactos.length) {                                    
                                    setContactos(contactos)
                                    setConversaciones(conversaciones)
                                }
                            }
                        })
                    })              
                }
            })
        }

        onAuthStateChanged(auth, (user) => {
            if(user) {          
                getUserData(user)                
                setUserData(user)
            }
            else {
                navigate("/login")    
            }
        })
    }, [navigate])

    return(
        <div className={styles.app}>
            <UserNavbar cambioPagina={pagina} setCambioPagina={setPagina} />
            {setPaginaUser(pagina, userData, contactos, conversaciones, contactoSelected, setContactoSelected)}
        </div>
    )
}

export default UserApp