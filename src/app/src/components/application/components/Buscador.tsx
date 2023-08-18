import TarjetaContacto from "./chat/TarjetaContacto";
import buscar from "../../../img/application/buscar.svg"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from "../../../css/application/App.module.css"
import Cookies from "js-cookie";

interface Props {
    contactoSelected: string,
    setContactoSelected: Dispatch<SetStateAction<string>>,
    imgContactos: string,
    contactos: ContactoDatos[] | undefined
}

interface ContactoDatos {
    displayName : string,
    uid: string
}

function checkIfScrollable() {
    let buscador = document.getElementsByClassName(styles.listaContactos)[0]
    let buscadorCss = window.getComputedStyle(document.getElementsByClassName(styles.listaContactos)[0], "")
    
    if(buscador.clientHeight > parseFloat(buscadorCss.maxHeight)) {

        buscador.classList.add(styles.listaScrollable)
    }
}

function Buscador({contactoSelected, setContactoSelected, imgContactos, contactos}: Props) {
    
    useEffect(() => {
        checkIfScrollable()
    }, [])

    let uid = Cookies.get("uid")

    const [userName, setUserName] = useState("")

    const handleBuscar = async (username: string) => {

        setUserName(username)
        let listaContactos = document.getElementsByClassName(styles.tarjetaContacto)
        
        if(username !== "") {
            
            for (let i = 0; i < listaContactos.length; i++) {
                const contacto = listaContactos[i];
                let nombre = contacto.getElementsByClassName("nombreContacto")[0]
                
                if(!nombre.innerHTML.toLowerCase().includes(username.toLowerCase())) {                    
                    contacto.classList.add(styles.oculto)
                }
                else if(contacto.classList.contains(styles.oculto)) {
                    contacto.classList.remove(styles.oculto)
                }
            }
        }
        if(username === "") {            
            for (let i = 0; i < listaContactos.length; i++) {
                const contacto = listaContactos[i];
                if(contacto.classList.contains(styles.oculto)) {
                    contacto.classList.remove(styles.oculto)
                }
            }
        }
    }

    return(
        <div className={styles.buscador}>
                <div className={styles.buscadorInput}>
                    <input type="text" className={styles.buscarInput} placeholder="Buscar..." onChange={e => {handleBuscar(e.target.value)}} value={userName}/>
                    <img src={buscar} alt="Icono buscar" />
                </div>

                <div className={styles.listaContactos}>
                    {
                        document.getElementsByClassName(styles.listaContactos)[0] !== undefined
                        ?
                        contactos?.map((contacto) => {
                            return <TarjetaContacto imagenContacto={""} nombre={contacto.displayName} noLeidos={0} selected={contactoSelected} setSelected={setContactoSelected} key={contacto.uid + "-" + uid} />
                        })
                        :
                        <></>
                    }
                </div>
            </div>
    )
}

export default Buscador