import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "../../../../css/application/AppChat.module.css"
import InfoContacto from "./InfoContacto"
import Conversacion from "./Conversacion"
import Cookies from "js-cookie"
import Buscador from "../Buscador"
import { auth, db } from "../../../../js/firebaseApp"
import { DocumentData, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { User } from "firebase/auth"

interface Props {
    datos: User,
    contactoSelected: string,
    contactos: ContactoDatos[],
    conversaciones: ConversacionInterfaz[],
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
    mensajes: DocumentData
}

function Chat(props: Props) {

    const [conversacionActual, setConversacionActual] = useState<ConversacionInterfaz>({uid: "", mensajes: []})

    useEffect(() => {
        if (props.contactoSelected !== "") {
            
            for (let i = 0; i < props.conversaciones.length; i++) {
                const element : ConversacionInterfaz = props.conversaciones[i];

                let contactoSeleccionado = props.contactos.find((contacto) => {                    
                    return contacto.displayName === props.contactoSelected
                })
                if(contactoSeleccionado?.key === element.uid) {
                    
                    setConversacionActual(element)
                    break;
                }
            } 
        }
    }, [props.conversaciones, props.contactoSelected, props.contactos])

    return(
        <div className={styles.chat}>
            <Buscador contactoSelected={props.contactoSelected} setContactoSelected={props.setContactoSelected} imgContactos={""} contactos={props.contactos} />

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