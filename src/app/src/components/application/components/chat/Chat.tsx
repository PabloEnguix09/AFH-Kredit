import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "../../../../css/application/AppChat.module.css"
import InfoContacto from "./InfoContacto"
import Conversacion from "./Conversacion"
import Cookies from "js-cookie"
import Buscador from "../Buscador"
import { auth, db } from "../../../../js/firebaseApp"
import { collection, getDoc, getDocs, query, where } from "firebase/firestore"

interface Props {
    datos: Object,
    contactoSelected: string,
    setContactoSelected: Dispatch<SetStateAction<string>>
}

interface ContactoDatos {
    displayName : string,
    uid: string,
    key: string,
    conversacionUID: string
}

interface ConversacionInterfaz {
    uid: string,
    mensajes: any[]
}

function Chat(props: Props) {

    const [conversaciones, setConversaciones] = useState<Object[]>([])
    const [contactos, setContactos] = useState<ContactoDatos[]>([])

    const [conversacionActual, setConversacionActual] = useState<ConversacionInterfaz>({uid: "", mensajes: []})
    
    useEffect(() => {
        const getUserData = async() => {
            let uid = auth.currentUser!.email
            let user = (await getDocs(query(collection(db, "usuarios"), where("email", "==", uid)))).docs[0].data()
            console.log(user);
            
            let contactos : ContactoDatos[] = []
            let conversaciones = []
            for (let i = 0; i < user.contactos.length; i++) {
                let contacto = (await getDocs(query(collection(db, "usuarios"), where("email", "==", user.contactos[i])))).docs[0].data()
                let key = contacto.rol === "Admin" ? contacto.email + "-"+uid : uid + "-" + contacto.email
                let conversacion = (await getDocs(query(collection(db, "chats")))).docs.find(c => {
                    return c.id === (contacto.rol === "Admin" ? contacto.email + "-"+ uid : uid + "-" + contacto.email)
                })

                if(conversacion) {
                    contactos.push({displayName: contacto.nombre + " " + contacto.apellidos, uid: contacto.email, key:key, conversacionUID: conversacion.id})
                    conversaciones.push(conversacion.data()) 
                }               
            }
            setContactos(contactos)

            console.log(contactos);
            console.log(conversaciones);
            /*
            let uid = Cookies.get("uid")

            await fetch("http://localhost:5050/api/mensajes/"+uid)
            .then(async(response) => {
                let respuesta = await response.json()https://noodlemagazine.com/watch/371450_456239228
                setConversaciones(respuesta)
                
            })
            .then(async() => {
                await fetch("http://localhost:5050/api/users/"+uid)
                .then(async(response) => {
                    let respuesta = await response.json()
                    return respuesta.contactos
                })
                .then(async (uidContactos : string[]) => {
                    let datosContactos : ContactoDatos[] = []
                    
                    uidContactos.forEach(async contacto => {                    
                        await fetch("http://localhost:5050/api/users/"+contacto)
                        .then(async(response) => {
                            let respuesta = await response.json()
                            let key = ""
                            let conversacionUID = "" 
                            
                            for (let i = 0; i < conversaciones.length; i++) {
                                const element = conversaciones[i];
                                
                                let mensaje : any = Object.values(Object.values(element)["0"]["0"])["0"]
                                
                                if(mensaje["agente"] === contacto || mensaje["cliente"] === contacto) {
                                    key = mensaje["agente"] + "-" + mensaje["cliente"]
                                    conversacionUID = Object.keys(element)[0]                                    
                                    break;
                                }
                            }
                            datosContactos.push({displayName: respuesta.nombre + " " + respuesta.apellidos, uid: contacto, key: key, conversacionUID: conversacionUID})   
                            
                            if(datosContactos.length === uidContactos.length) {                                                  
                                setContactos(datosContactos)
                            }
                        })
                    })
                })
            })*/
        }
        getUserData()
    }, [])

    useEffect(() => {

        const getMensajes = () => {
            
            for (let i = 0; i < conversaciones.length; i++) {
                const element = conversaciones[i];                
                
                let mensaje : any = Object.values(Object.values(element)["0"]["0"])["0"]


                let contactoSeleccionado = contactos.find((contacto) => {                    
                    return contacto.displayName === props.contactoSelected
                })
                
                if(contactoSeleccionado !== undefined && (mensaje["agente"] === contactoSeleccionado.uid || mensaje["cliente"] === contactoSeleccionado.uid)) {
                    let conversacion : ConversacionInterfaz = { uid: contactoSeleccionado.conversacionUID, mensajes: Object.values(Object.values(element)["0"]["0"])}
                    
                    setConversacionActual(conversacion)
                    console.log(conversacionActual);
                    
                    break;
                }
            } 
        }

        getMensajes()
    }, [conversaciones, props.contactoSelected, contactos])

    return(
        <div className={styles.chat}>
            <Buscador contactoSelected={props.contactoSelected} setContactoSelected={props.setContactoSelected} imgContactos={""} contactos={contactos} />

            <div className={styles.ventanaChat}>
                {props.contactoSelected !== ""
                ?
                    <>
                        <InfoContacto imagenContacto={""} nombre={props.contactoSelected} telf={"+34 XXX XX XX XX"} />
                        <Conversacion imagenContacto={""} conversacion={conversacionActual} />
                    </>
                :
                    <></>
                }
            </div>
        </div>
    )
}

export default Chat