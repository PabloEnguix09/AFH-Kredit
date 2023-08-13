import styles from "../../../../css/application/AppChat.module.css"
import adjuntar from "../../../../img/application/adjuntar.svg"
import enviar from "../../../../img/application/enviar.svg"
function ChatInput() {
    return(
        <div className={styles.chatInput}>
            <img src={adjuntar} alt="Adjuntar archivo" className={styles.adjuntar} />
            <textarea name="" id="" cols={30} rows={10} placeholder="Escribe un mensaje..." />
            <img src={enviar} alt="Enviar mensaje" className={styles.enviar} />
        </div>
    )
}

export default ChatInput