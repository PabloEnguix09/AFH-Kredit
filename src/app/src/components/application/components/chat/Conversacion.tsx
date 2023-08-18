import Cookies from "js-cookie"
import styles from "../../../../css/application/AppChat.module.css"
import defaultImg from "../../../../img/application/default-profile.svg"
import ChatInput from "./ChatInput"
import Mensaje from "./Mensaje"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Timestamp, collection, onSnapshot } from "firebase/firestore"
import { auth, db } from "../../../../js/firebaseApp"

interface Props {
    imagenContacto: string,
    conversacion: ConversacionInterfaz
}

interface ConversacionInterfaz {
    uid: string,
    mensajes: any[]
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

function setConversacion(imagen: string, mensajes: IMensaje[]) {

    const semana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    let hoy = new Date().getUTCDate()

    let ultimoMensaje : IMensaje | null = null
    let conversacion = mensajes.map((mensaje: IMensaje) => {
        
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

        /*if(hoy === fecha.fecha.dia) {
            dia = "Hoy"
        }
        else if(hoy - fecha.fecha.dia === 1) {
            console.log("ayer");
            console.log(mensaje.contenido);
            
            
            dia = "Ayer"
        }
        else if(hoy-fecha.fecha.dia <= 7) {
            console.log("esta semana");
            console.log(mensaje.contenido);

            dia = semana[mensaje.timestamp.toDate().getDay()]
        }
        else {
            dia = mensaje.timestamp.toDate().toLocaleDateString()
        } */
        console.log(dia);
        
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

        /*if(fecha.fecha.dia === hoy) {
            if (hoy === new Date().getUTCDate() && fechaUltimoMensaje?.fecha.dia === hoy) {
                console.log("ES HOYYYYYYYYYYYYYY");
                ultimoMensaje = mensaje
                hoy--
                return <>
                    <span className={styles.fecha}>Hoy</span>
                    <Mensaje entrante={mensaje.senderId !== auth.currentUser?.email} imagenContacto={imagen} contenido={mensaje.contenido} hora={hora} />
                </>
            }
            else if(hoy === new Date().getUTCDate() - 1) {
                console.log("AYER");
                ultimoMensaje = mensaje
                hoy--
                return <>
                    <span className={styles.fecha}>Ayer</span>
                    <Mensaje entrante={mensaje.senderId !== auth.currentUser?.email} imagenContacto={imagen} contenido={mensaje.contenido} hora={hora} />
                </>
            }
            else if(new Date().getUTCDate() - hoy < 7 ) {
                console.log(new Date().getUTCDate() - hoy);
                
                console.log("mas tarde de ayer, pero en esta semana");
                ultimoMensaje = mensaje
                hoy--
                return <>
                    <span className={styles.fecha}>{hoy}</span>
                    <Mensaje entrante={mensaje.senderId !== auth.currentUser?.email} imagenContacto={imagen} contenido={mensaje.contenido} hora={hora} />
                </>
            }
            else {
                console.log("poner fecha completa");
            }                        
        }*/
        ultimoMensaje = mensaje
        return <Mensaje entrante={mensaje.senderId !== auth.currentUser?.email} imagenContacto={imagen} contenido={mensaje.contenido} hora={hora} />

    })    

    return conversacion
/*
    return conversacion.mensajes.map((mensaje) => {
        
        let fecha = new Date(mensaje["fecha"] * 1000)
        let hora = fecha.getHours() + ":" + fecha.getMinutes()

        return <Mensaje key={mensaje["id"]} entrante={(mensaje["agente"] === uid && mensaje["isClienteSender"]) || (mensaje["cliente"] === uid && !mensaje["isClienteSender"])} imagenContacto={imagen} contenido={mensaje["contenido"]} hora={hora} />
    })
*/
}

function Conversacion(props:Props) {
    const imagen = props.imagenContacto !== "" ? props.imagenContacto : defaultImg
    
    const [snapshot, setSnapshot] = useState(null)
    const [mensajes, setMensajes] = useState<IMensaje[]>([])
    useEffect(() => {
    
        const chatRef = collection(db, "chats", props.conversacion.uid)
        onSnapshot(chatRef, (snapshot) => {
            let mensajes = snapshot.docs[0].data()
            setSnapshot(mensajes.mensajes)
        })
        
    }, [props.conversacion.uid])

    useEffect(() => {
      if (snapshot !== null) {
        setMensajes(snapshot)
      }
    }, [snapshot])
    
    return(
        <div className={styles.conversacion}>
            <div className={styles.mensajes}>
                {/*<span className={styles.fecha}>Hoy</span> */}


                {setConversacion(imagen, mensajes)}


                <Mensaje entrante={true} imagenContacto={imagen} contenido={"Buenas, Usuario. ¿En qué puedo ayudarte hoy?"} hora={"11:11"} />
                <Mensaje entrante={false} imagenContacto={imagen} contenido={"Buenas, Asesor, tengo un par de dudas sobre mi hipoteca"} hora={"11:13"} />

                <Mensaje entrante={true} imagenContacto={imagen} contenido={"Buenas, Usuario. ¿En qué puedo ayudarte hoy?"} hora={"11:11"} />
                <Mensaje entrante={true} imagenContacto={imagen} contenido={"Buenas, Usuario. ¿En qué puedo ayudarte hoy?"} hora={"11:11"} />
                <Mensaje entrante={true} imagenContacto={imagen} contenido={"Buenas, Usuario. ¿En qué puedo ayudarte hoy?"} hora={"11:11"} />

                <Mensaje entrante={false} imagenContacto={imagen} contenido={"Buenas, Asesor, tengo un par de dudas sobre mi hipoteca"} hora={"11:13"} />
                <Mensaje entrante={false} imagenContacto={imagen} contenido={"Buenas, Asesor, tengo un par de dudas sobre mi hipoteca"} hora={"11:13"} />
                <Mensaje entrante={false} imagenContacto={imagen} contenido={"Buenas, Asesor, tengo un par de dudas sobre mi hipoteca"} hora={"11:13"} />
                <Mensaje entrante={false} imagenContacto={imagen} contenido={"Buenas, Asesor, tengo un par de dudas sobre mi hipoteca"} hora={"11:13"} />
            </div>
        
            <ChatInput />
            
        </div>
    )
}

export default Conversacion