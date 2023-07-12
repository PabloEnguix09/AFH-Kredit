import React, { useRef, useState } from "react"
import iconoMas from "../../img/icono_mas.svg"
import styles from "./Landing.module.css";

interface Props {
    pregunta: string,
    respuesta: string
}

function FAQ({pregunta, respuesta}: Props) {
    const [toggle, setToggle] = useState(false)
    const referencia = useRef<HTMLSpanElement>(null);

    return(
        <div className={styles.faq}>
            <div>
                <p>{pregunta}</p>
                <img src={iconoMas} alt="Ver más" onClick={() => setToggle(!toggle)}/>
            </div>
            <span ref={referencia} style={toggle ? {
                height: referencia.current?.scrollHeight + "px", marginTop: "1.8vh",
            } : {
                height:"0px", marginTop:"0",
            }}>{respuesta}</span>
            <hr />
        </div>
    )
}

//{toggle && <span>{respuesta}</span>}
export default FAQ