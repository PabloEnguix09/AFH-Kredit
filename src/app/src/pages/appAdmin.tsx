import Chat from "../components/application/components/chat/Chat"
import AdminNavbar from "../components/application/admin/AdminNavbar"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Documentos from "../components/application/components/documentos/Documentos"
import BaseDatos from "../components/application/components/baseDatos/BaseDatos"
import Blog from "../components/application/components/blog/Blog"
import Ajustes from "../components/application/components/Ajustes"

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

function setPaginaAdmin(pagina:string, userData: User | null, contactos: ContactoDatos[], conversaciones: ConversacionInterfaz[], contactoSelected:string, setContactoSelected:Dispatch<SetStateAction<string>>) {
    if(userData !== null && contactos.length !== 0) {
        switch (pagina) {
            case "Chat":
                return <Chat datos={userData} contactos={contactos} conversaciones={conversaciones} contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} />
            case "Documentos":
                return <Documentos contactos={contactos} contactoSelected={contactoSelected} setContactoSelected={setContactoSelected} />
            case "BD":
                return <BaseDatos />
            case "Blog":
                return <Blog />
            case "Ajustes":
                return <Ajustes nombreCompleto={userData.displayName!} correo={userData.email!} imagen={""} />
        }
    }
        
}

function AdminApp() {

    const [userData, setUserData] = useState<User | null>(null)

    const [pagina, setPagina] = useState("Chat")

    const [contactos, setContactos] = useState<ContactoDatos[]>([])
    const [conversaciones, setConversaciones] = useState<ConversacionInterfaz[]>([])


    const [contactoSelected, setContactoSelected] = useState("")
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
        let contador = 0
        onAuthStateChanged(auth, (user) => {            
            if(user && userData === null && contador < 5) {
                contador++
                
                getUserData(user)
                setUserData(user)
            }
            else if(!user || contador >= 5){
                console.log(user);
                console.log(userData);
                console.log(contador);
                
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