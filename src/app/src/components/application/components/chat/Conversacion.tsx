import styles from "../../../../css/application/AppChat.module.css"
import defaultImg from "../../../../img/application/default-profile.svg"
import ChatInput from "./ChatInput"
import Mensaje from "./Mensaje"

interface Props {
    imagenContacto: string,

}

function Conversacion(props:Props) {
    const imagen = props.imagenContacto !== "" ? props.imagenContacto : defaultImg

    return(
        <div className={styles.conversacion}>
            <div className={styles.mensajes}>
                <span className={styles.fecha}>Hoy</span>
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