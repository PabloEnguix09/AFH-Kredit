import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react"
import styles from "../../../../css/application/AppChat.module.css"
import adjuntar from "../../../../img/application/adjuntar.svg"
import enviar from "../../../../img/application/enviar.svg"
import { auth, db } from "../../../../js/firebaseApp"
import { Timestamp, addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"

interface IMensaje { 
    timestamp: Timestamp
    senderId: string | undefined
    contenido: string 
}

interface Props {
    chatUid: string
}

async function sendMensaje(contenido: string, chatUid : string, setContenido: Dispatch<SetStateAction<string>>) {
    
    if(contenido && contenido !== "") {
        let mensaje : IMensaje = {
            contenido:contenido,
            senderId: auth.currentUser!.email!,
            timestamp: Timestamp.fromDate(new Date())
        }
        const chatRef = doc(db, "chats", chatUid)
        await updateDoc(chatRef, {
            mensajes: arrayUnion(mensaje)
        })
        setContenido("")
        
    }
}

async function sendOnEnter(e: React.KeyboardEvent<HTMLTextAreaElement>, contenido: string, chatUid: string, setContenido: Dispatch<SetStateAction<string>>) {
    if(e.key === "Enter" && !e.shiftKey && e.currentTarget.value !== "") {
        await sendMensaje(contenido, chatUid, setContenido)
    }
}

function ChatInput({chatUid} : Props) {

    const [contenido, setContenido] = useState("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const onChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
        if(textAreaRef.current) {
            textAreaRef.current.style.height = "1px"
            let padding = parseInt(getComputedStyle(textAreaRef.current).paddingTop)            
            
            textAreaRef.current.style.height = `${Math.min(e.target.scrollHeight - padding*2, 4*16)}px`;
        }
        setContenido(e.target.value)

    }
    return(
        <div className={styles.chatInput}>
            <img src={adjuntar} alt="Adjuntar archivo" className={styles.adjuntar} />
            <textarea className={styles.textareaInput} name="" id="" cols={30} rows={10} placeholder="Escribe un mensaje..." onChange={e => onChangeHandler(e)} onKeyDown={async(e) => await sendOnEnter(e, contenido, chatUid, setContenido)} value={contenido} ref={textAreaRef}/>
            <img src={enviar} alt="Enviar mensaje" className={styles.enviar} onClick={async() => await sendMensaje(contenido, chatUid, setContenido)}/>
        </div>
    )
}

export default ChatInput