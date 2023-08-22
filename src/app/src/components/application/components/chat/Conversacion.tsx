import Cookies from "js-cookie"
import styles from "../../../../css/application/AppChat.module.css"
import defaultImg from "../../../../img/application/default-profile.svg"
import ChatInput from "./ChatInput"
import Mensaje from "./Mensaje"

import { Dispatch, SetStateAction, createRef, useEffect, useRef, useState } from "react"
import { DocumentData, Timestamp, collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"
import { auth, db } from "../../../../js/firebaseApp"

interface Props {
    imagenContacto: string,
    conversacion: ConversacionInterfaz
}

interface ConversacionInterfaz {
    uid: string,
    mensajes: DocumentData
}

interface IMensaje { 
    timestamp: Timestamp
    senderId: string | undefined
    contenido: string 
}

interface FechaHora {
    fecha: {
        dia: number,
        mes: number,
        anyo: number
    },
    hora: {
        hora: number,
        minutos: number,
        segundos: number
    }
}

function averiguarDia(diaMensaje: number, timestamp:Timestamp) {
    let hoy = new Date().getUTCDate()
    const semana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

    if (hoy === diaMensaje) {
        return "Hoy"
    }
    if ((hoy - diaMensaje) === 1) {
        return "Ayer"
    }
    if (hoy - diaMensaje <= 7) {
        return semana[timestamp.toDate().getDay()]
    }

    return timestamp.toDate().toLocaleDateString()
    
}

function setConversacion(imagen: string, mensajes: DocumentData[]) {

    let ultimoMensaje : DocumentData | null = null
    let conversacion = mensajes.map((mensaje: DocumentData) => {
        
        let fechaMensaje = mensaje.timestamp.toDate().toLocaleString().split(",")        

        let fecha : FechaHora = {
            fecha: {
                dia: parseInt(fechaMensaje[0].split("/")[0]),
                mes: parseInt(fechaMensaje[0].split("/")[1]),
                anyo: parseInt(fechaMensaje[0].split("/")[2])
            },
            hora: {
                hora: parseInt(fechaMensaje[1].split(":")[0]),
                minutos: parseInt(fechaMensaje[1].split(":")[1]),
                segundos: parseInt(fechaMensaje[1].split(":")[2])
            }
        }

        let fechaUltimoMensaje : FechaHora | null = null
        if(ultimoMensaje !== null) {
            let timestamp = ultimoMensaje.timestamp.toDate().toLocaleString().split(",")
            fechaUltimoMensaje = {
                fecha: {
                    dia: parseInt(timestamp[0].split("/")[0]),
                    mes: parseInt(timestamp[0].split("/")[1]),
                    anyo: parseInt(timestamp[0].split("/")[2])
                },
                hora: {
                    hora: parseInt(timestamp[1].split(":")[0]),
                    minutos: parseInt(timestamp[1].split(":")[1]),
                    segundos: parseInt(timestamp[1].split(":")[2])
                }
            }

        }

        let hora = fecha.hora.hora + ":" + (fecha.hora.minutos < 10 ? "0" + fecha.hora.minutos : fecha.hora.minutos)

        let dia = averiguarDia(fecha.fecha.dia, mensaje.timestamp)
        
        if(fechaUltimoMensaje === null) {
            ultimoMensaje = mensaje
            return <>
                    <span className={styles.fecha}>{dia}</span>
                    <Mensaje entrante={mensaje.senderId !== auth.currentUser?.email} imagenContacto={imagen} contenido={mensaje.contenido} hora={hora} />
                </>
        }
        else if(fecha.fecha.dia - fechaUltimoMensaje.fecha.dia >= 1){
            ultimoMensaje = mensaje
            return <>
                    <span className={styles.fecha}>{dia}</span>
                    <Mensaje entrante={mensaje.senderId !== auth.currentUser?.email} imagenContacto={imagen} contenido={mensaje.contenido} hora={hora} />
                </>
        }
        ultimoMensaje = mensaje
        return <Mensaje entrante={mensaje.senderId !== auth.currentUser?.email} imagenContacto={imagen} contenido={mensaje.contenido} hora={hora} />

    })    

    return conversacion
}

function Conversacion(props:Props) {
    const imagen = props.imagenContacto !== "" ? props.imagenContacto : defaultImg
    
    const [snapshot, setSnapshot] = useState<DocumentData[] | null>(null)
    const [mensajes, setMensajes] = useState<DocumentData[]>([])

    const conversacionRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        
        if(props.conversacion.uid !== "") {
            const chatRef = doc(db, "chats", props.conversacion.uid)

            onSnapshot(chatRef, (snap) => {
                let mensajes = snap.data()
                if(mensajes) {
                    setSnapshot(mensajes.mensajes)
                }
            })
        }
        
    }, [props.conversacion.uid])

    useEffect(() => {
      if (snapshot !== null) {
        setMensajes(snapshot)
      }

    }, [snapshot])

    useEffect(() => {
      
    if (mensajes.length) {
        if(conversacionRef.current) {
                        
            conversacionRef.current.scrollIntoView({ block: "end", behavior: "auto" })
        }
    }
    }, [mensajes])
    
    
    
    return(
        <div className={styles.conversacion}>
            <div className={styles.mensajes}>
                {setConversacion(imagen, mensajes)}
                <div ref={conversacionRef}></div>
            </div>
        
            <ChatInput chatUid={props.conversacion.uid} />
            
        </div>
    )
}

export default Conversacion