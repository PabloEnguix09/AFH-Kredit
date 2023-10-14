import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import styles from "../../../../css/application/AppChat.module.css"
import appStyles from "../../../../css/application/App.module.css"
import InfoContacto from "./InfoContacto"
import Conversacion from "./Conversacion"
import Buscador from "../Buscador"
import { User } from "firebase/auth"
import { IContactoDatos, IConversacionInterfaz } from "../../../../types/app.types"
import UsuarioAPI from "../../../../services/users"

const api = new UsuarioAPI()

interface Props {
    datos: User,
    contactoSelected: string,
    contactos: IContactoDatos[],
    conversaciones: IConversacionInterfaz[],
    setContactoSelected: Dispatch<SetStateAction<string>>
}

function Chat(props: Props) {


    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)
    const [imgContacto, setImgContacto] = useState("")
    const [conversacionActual, setConversacionActual] = useState<IConversacionInterfaz>({uid: "", mensajes: []})

    useEffect(() => {
        const crearChat = async() => {
            for (let i = 0; i < props.conversaciones.length; i++) {
                const element : IConversacionInterfaz = props.conversaciones[i];

                let contactoSeleccionado = props.contactos.find((contacto) => {                    
                    return contacto.displayName === props.contactoSelected
                })
                if(contactoSeleccionado?.key === element.uid) {
                    await api.getImagen(contactoSeleccionado.uid).then((res) => {
                        setImgContacto(res)
                        setConversacionActual(element)
                    })
                }
            }
        }

        const cambiarPantallaMovil = async() => {
                document.getElementsByClassName(styles.chatMovil)[0].getElementsByClassName(styles.ventanaChat)[0].classList.remove(appStyles.oculto)
                console.log("chat mostrado");
        }
        if (props.contactoSelected !== "") {
            if(deviceWidth <= 768) {
                cambiarPantallaMovil()
            }
            crearChat()
        }
    }, [props.conversaciones, props.contactoSelected, props.contactos, deviceWidth])

    return(
        <div>
            <div className={styles.chat}>
                <Buscador contactoSelected={props.contactoSelected} setContactoSelected={props.setContactoSelected} imgContactos={""} contactos={props.contactos} />

                <div className={styles.ventanaChat}>
                    {props.contactoSelected !== ""
                    ?
                        <>
                            <InfoContacto imagenContacto={imgContacto} nombre={props.contactoSelected} telf={""} setContactoSelected={props.setContactoSelected}/>
                            <Conversacion imagenContacto={""} conversacion={conversacionActual} />
                        </>
                    :
                        <></>
                    }
                </div>
            </div>

            <div className={styles.chatMovil}>
                <Buscador contactoSelected={props.contactoSelected} setContactoSelected={props.setContactoSelected} imgContactos={""} contactos={props.contactos} />

                <div className={`${styles.ventanaChat} ${appStyles.oculto}`}>
                    {props.contactoSelected !== ""
                    ?
                        <>
                            <InfoContacto imagenContacto={imgContacto} nombre={props.contactoSelected} telf={""} setContactoSelected={props.setContactoSelected}/>
                            <Conversacion imagenContacto={""} conversacion={conversacionActual} />
                        </>
                    :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat