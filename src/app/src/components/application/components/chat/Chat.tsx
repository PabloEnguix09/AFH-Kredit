import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "../../../../css/application/AppChat.module.css"
import InfoContacto from "./InfoContacto"
import Conversacion from "./Conversacion"
import Cookies from "js-cookie"
import ChatInput from "./ChatInput"
import Buscador from "../Buscador"

interface Props {
    datos: Object,
    contactoSelected: string,
    setContactoSelected: Dispatch<SetStateAction<string>>
}

function Chat(props: Props) {

    const [conversaciones, setConversaciones] = useState<Object[]>([])
    
    useEffect(() => {
        const getUserData = async () => {
            let uid = Cookies.get("uid")
    
            await fetch("http://localhost:5050/api/mensajes/"+uid)
            .then(async(response) => {
                let respuesta = await response.json()
                console.log(respuesta);
                setConversaciones(respuesta)

            })
        }
        getUserData()
    }, [])

    return(
        <div className={styles.chat}>
            <Buscador contactoSelected={props.contactoSelected} setContactoSelected={props.setContactoSelected} imgContactos={""} />

            <div className={styles.ventanaChat}>
                {props.contactoSelected !== ""
                ?
                    <>
                        <InfoContacto imagenContacto={""} nombre={props.contactoSelected} telf={"+34 XXX XX XX XX"} />
                        <Conversacion imagenContacto={""}/>
                    </>
                :
                    <></>
                }
            </div>
        </div>
    )
}

export default Chat