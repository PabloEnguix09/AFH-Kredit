import styles from "../../../../css/application/Documentos.module.css"
import commonStyles from "../../../../css/application/AppChat.module.css"
import Buscador from "../Buscador"
import { Dispatch, SetStateAction } from "react"
import InfoContacto from "../chat/InfoContacto"
import Doc from "./Doc"

interface Props {
    contactoSelected: string,
    setContactoSelected: Dispatch<SetStateAction<string>>
}

function Documentos(props:Props) {
    return(
        <div className={styles.documentos}>
            <Buscador contactoSelected={props.contactoSelected} setContactoSelected={props.setContactoSelected} imgContactos={""} />

            <div className={commonStyles.ventanaChat}>
            {props.contactoSelected !== ""
                ?
                    <>
                        <InfoContacto imagenContacto={""} nombre={props.contactoSelected} telf={"+34 XXX XX XX XX"} />
                        <div className={styles.listaDocumentos}>
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={false} nombreDoc={"xd momento"} />
                            <Doc nuevo={true} nombreDoc={""} />
                        </div>
                    </>
                :
                    <></>
                }
            </div>
        </div>
    )
}

export default Documentos