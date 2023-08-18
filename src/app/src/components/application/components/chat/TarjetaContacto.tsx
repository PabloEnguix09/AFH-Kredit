import { Dispatch, useEffect, useRef, useState } from "react"
import styles from "../../../../css/application/App.module.css"
import defaultImg from "../../../../img/application/default-profile.svg"

interface Props {
    imagenContacto: string,
    nombre: string,
    noLeidos: number,
    selected: string,
    setSelected: Dispatch<React.SetStateAction<string>>

}
function TarjetaContacto(props: Props) {

    const imagen = props.imagenContacto !== "" ? props.imagenContacto : defaultImg
    const estaTarjeta = useRef() as React.MutableRefObject<HTMLDivElement>

    return(
        <>
            {
            props.selected === props.nombre

            ?

                <div className={`${styles.tarjetaContacto} ${styles.selected}`} onClick={() => props.setSelected("")} ref={estaTarjeta}>
                    <div>
                        {props.imagenContacto === "none" ? <></> : <img src={imagen} alt="Icono contacto" />}
                        <span className="nombreContacto">{props.nombre}</span>
                    </div>
                    <span className={styles.noLeidos} style={{display: props.noLeidos === 0 || props.imagenContacto ==="none" ? "none" : "flex"}}>{props.noLeidos}</span>
                </div>
            
            :

                <div className={styles.tarjetaContacto} onClick={() => props.setSelected(props.nombre)} ref={estaTarjeta}>
                    <div>
                        {props.imagenContacto === "none" ? <></> : <img src={imagen} alt="Icono contacto" />}
                        <span className="nombreContacto">{props.nombre}</span>
                    </div>
                    <span className={styles.noLeidos} style={{display: props.noLeidos === 0 || props.imagenContacto ==="none" ? "none" : "flex"}}>{props.noLeidos}</span>
                </div>
        }
        </>
        
    )
}

export default TarjetaContacto